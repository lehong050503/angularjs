window.PhoneController = function($scope,$routeParams,$http,$location){

    let apiUrl = "http://localhost:3000/phone";
    $scope.getData = function(){
        $http.get(apiUrl).then(function(response){
            if(response.status == 200){
                $scope.danhSach = response.data;
            }
        })
    }
    $scope.getData();
    $scope.onClose =  function(){
        $scope.inPV = {
            ten:"",
            hang:"",
            dungLuong:"",
            gia:""
        }
        $scope.editId = 0;
    }
    $scope.add = function(){
        let flag=false;
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
                id:newId,
                ten:$scope.inPV.ten,
                hang:$scope.inPV.hang,
                dungLuong:$scope.inPV.dungLuong,
                gia:$scope.inPV.gia
            }
            $http.post(apiUrl,newItem).then(function(response){
                $scope.getData();
                $location.path('/phone');
            })
            $scope.onClose();
        }
    }
    $scope.detail = function(editId){
        $location.path(`/phone/detail/${editId}`)
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
        let confirm = window.confirm("Bạn muốn xóa không");
        $scope.deleteId = deleteId;
        if(confirm){
            $http.delete(`${apiUrl}/${deleteId}`).then(function(response){
                if(response.status == 200){
                    $scope.getData();
                    $location.path('/phone');
                }
            })
        }
    }
}