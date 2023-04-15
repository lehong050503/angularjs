window.ProductController = function($scope,$routeParams,$http,$location){
    $scope.tieuDe = "Quản lý sản phẩm";

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

    $scope.onSubmit = function(){
        $scope.validate = {
            name:false,
            price:false,
            price2:false,
            categoryName:false

        }

        let flag=false;

        
        if(!$scope.inPV || !$scope.inPV.name){
            $scope.validate.name = true;
            flag=true;
        }
        if(!$scope.inPV || !$scope.inPV.price){
            $scope.validate.price = true;
            flag=true;
        }else if(!$scope.inPV.price <=100){
            $scope.validate.price2 = true;
            flag=true;
        }
        
        if(!$scope.inPV || !$scope.inPV.categoryName){
            $scope.validate.categoryName = true;
            flag=true;
        }

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
                    $location.path('/product');
                })
                $scope.onClose();
                return;
            }

            let ds = $scope.danhSach;
            let newId = ds.length > 0 ? ds[ds.length-1].id + 1 : 1;
            let newItem = {
                id:newId,
                name:$scope.inPV.name,
                price:$scope.inPV.price,
                categoryName:$scope.inPV.categoryName
            }
            $http.post(apiUrl,newItem).then(function(response){
                $scope.getData();
                $location.path('/product');
            })
            $scope.onClose();
        }

        
    }

    $scope.edit = function(editId){
        $location.path(`/product/edit/${editId}`);
    }
    if($routeParams.id){
        $http.get(`${apiUrl}/${$routeParams.id}`).then(function(response){
            if(response.status == 200){
                $scope.inPV = {
                    name:response.data.name,
                    price:response.data.price,
                    categoryName:response.data.categoryName
                }
            }
        })
    }

    $scope.del = function(deleteId){
        $scope.deleteId = deleteId;
        let confirm = window.confirm("Xóa nhé ? ");
        if(confirm){
            $http.delete(`${apiUrl}/${deleteId}`).then(function(response){
                if(response.status == 200){
                    $scope.getData();
                    $location.path('/product');
                }
            })
        }
    }
}