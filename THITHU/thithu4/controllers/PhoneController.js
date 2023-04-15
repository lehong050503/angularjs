window.PhoneController = function($scope,$http,$routeParams,$location){
    $scope.title = "Quản lý điện thoại";

    let apiUrl = "http://localhost:3000/phone";

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
            ten:"",
            hang:"",
            dungLuong:"",
            gia:""

        }
        $scope.editId = 0;
    }
    $scope.add = function(){

        let flag = false;
        $scope.validate = {
            ten:false,
            hang:false,
            dungLuong:false,
            gia:false
        }
        if(!$scope.inPV || !$scope.inPV.ten){
            $scope.validate.ten = true;
            flag=true;
        }
        if(!$scope.inPV || !$scope.inPV.hang){
            $scope.validate.hang = true;
            flag=true;
        }
        if(!$scope.inPV || !$scope.inPV.dungLuong){
            $scope.validate.dungLuong = true;
            flag=true;
        }
        if(!$scope.inPV || !$scope.inPV.gia){
            $scope.validate.gia = true;
            flag=true;
        }
        

        if(!flag){
            let editId = $routeParams.id;

            if(editId){
                let updateItem = {
                    ten:$scope.inPV.ten,
                    hang:$scope.inPV.hang,
                    dungLuong:$scope.inPV.dungLuong,
                    gia:$scope.inPV.gia
                }
                $http.put(`${apiUrl}/${editId}`,updateItem).then(function(response){
                    
                    $scope.getData();
                    $location.path('/phone');
                })
                $scope.onClose();
                return;
            }

            let ds = $scope.danhSach;
            let newId = ds.length > 0 ? ds[ds.length-1].id + 1 : 1;
            let newItem = {
                id: newId,
                ten:$scope.inPV.ten,
                hang:$scope.inPV.hang,
                dungLuong:$scope.inPV.dungLuong,
                gia:$scope.inPV.gia
            }
            $http.post(apiUrl,newItem).then(function(response){
                $scope.getData();
                $location.path('/phone');
                alert('Them thanh cong');
                
            })
            $scope.onClose();
        }
    }

    $scope.detail = function(editId){
        $location.path(`/phone/detail/${editId}`);
    }
    if($routeParams.id){
        $http.get(`${apiUrl}/${$routeParams.id}`).then(function(response){
            if(response.status == 200){
                $scope.inPV = {
                    ten:response.data.ten,
                    hang:response.data.hang,
                    dungLuong:response.data.dungLuong,
                    gia:response.data.gia
                }
            }
        })
    }
    $scope.delete = function(deleteId){
        $scope.deleteId = deleteId;
        let confirm = window.confirm("Delete?");
        if(confirm){
        $http.delete(`${apiUrl}/${deleteId}`).then(function(response){
            
                if(response.status == 200){
                    
                    $scope.getData();
                    location.path('/phone');
                    alert('Xoa thanh cong');
                }
            
            
        })}
    }

}