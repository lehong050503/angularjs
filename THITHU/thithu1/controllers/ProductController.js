window.ProductController = function($scope,$routeParams,$http,$location){


    // Tham số location dùng để hỗ trợ chuyển trang
    // $location.path('tên route cân chuyển')
    let apiUrl = "http://localhost:3000/productsO";
    $scope.getData = function(){
        $http.get(apiUrl).then(function(response){
            if(response.status == 200){
                $scope.danhSach = response.data;
            }
        })
    }
    $scope.getData();
    $scope.onClose = function(){
        $scope.inPV = {
            name:"",
            price:"",
            categoryName:""
        }
        $scope.editId = 0;
    }
    $scope.addPro = function(){
        $location.path('/products/add');
    }
    $scope.onSubmit = function(){
        $scope.validate = {
            name:false,
            price:false,
            categoryName:false
        }
        let flag = false;

        if(!$scope.inPV || !$scope.inPV.name){
            $scope.kiemTra.name = true;
            flag = true;
        }
        if(!$scope.inPV || !$scope.inPV.price){
            $scope.kiemTra.price = true;
            flag = true;
        }
        if(!$scope.inPV || !$scope.inPV.categoryName){
            $scope.kiemTra.name = true;
            flag = true;
        }

        

        // Sua

        if(!flag){
            let editId = $routeParams.id;
            if(editId){
                let updateItem = {
                    name:$scope.inPV.name,
                    price:$scope.inPV.price,
                    categoryName:$scope.inPV.categoryName
                }
                $http.put(`${apiUrl}/${editId}`,updateItem).then(function(response){
                    $scope.getData();
                    $location.path('/products');
                })
                $scope.onClose();
                return;
            }

            // Them

            let ds = $scope.danhSach;
            let newId = ds.length > 0 ? ds[ds.length-1].id + 1 : 1;
            let newItem = {
                id:newId,
                name:$scope.inPV.name,
                price:$scope.inPV.price,
                categoryName:$scope.inPV.categoryName
            }
            $http.post(apiUrl,newItem).then(
                function(response){
                    $scope.getData();
                    $location.path('/products');
                }
            )
            $scope.onClose();
            
        }

        
    }


    $scope.editPro = function(editId){
        $location.path(`/products/${editId}/edit`);
        
    }
    if($routeParams.id){
        console.log($routeParams.id);
        $http.get(`${apiUrl}/${$routeParams.id}`).then(function(response){
            if(response.status == 200){
                console.log(response.data);
                $scope.inPV = {
                    name:response.data.name,
                    price:response.data.price,
                    categoryName:response.data.categoryName
                }
                
            }
        })
    }
    $scope.onDelete = function(deleteId){
        let confirm = window.confirm("Bạn có muốn xóa không ?");
        $scope.deleteId = deleteId;
        if(confirm){
            $http.delete(`${apiUrl}/${deleteId}`).then(function(response){
                if(response.status == 200){
                    $scope.getData();
                    $location.path('/products');
                }
            })
        }
    }

}