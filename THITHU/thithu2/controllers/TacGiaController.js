window.TacGiaController = function($scope,$routeParams,$http,$location){
    $scope.title = "Quản lý Tác giả";
    let apiUrl = "http://localhost:3000/tacGia";
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
            tuoi:"",
            diaChi:"",
            gt:""
        }
        $scope.editId = 0;
    }
    // $scope.update = function(){
    //     $location.path('/tac-gia/:id/edit');
    // }
    $scope.add = function(){
        let flag = false;
        if(!flag){

            let editId = $routeParams.id;
            if(editId){
                let updateItem = {
                    ten:$scope.inPV.ten,
                    tuoi:$scope.inPV.tuoi,
                    diaChi:$scope.inPV.diaChi,
                    gt:$scope.inPV.gt
                }
                $http.put(`${apiUrl}/${editId}`,updateItem).then(function(response){
                    $scope.getData();
                    $location('/tac-gia');
                })
                $scope.onClose();
                return;
            }

            let ds = $scope.danhSach;
            let newId = ds.length > 0 ? ds[ds.length-1].id + 1 : 1;
            let newItem = {
                id:newId,
                ten:$scope.inPV.ten,
                tuoi:$scope.inPV.tuoi,
                diaChi:$scope.inPV.diaChi,
                gt:$scope.inPV.gt
            }
            $http.post(apiUrl,newItem).then(function(response){
                $scope.getData();
                $location.path('/tac-gia');
            })
            $scope.onClose();
        }
    }
    $scope.update = function(editId){
        $location.path(`/tac-gia/${editId}/edit`);
    }
    if($routeParams.id){
        $http.get(`${apiUrl}/${$routeParams.id}`).then(function(response){
            if(response.status == 200){
                $scope.inPV = {
                    ten:response.data.ten,
                    tuoi:response.data.tuoi,
                    diaChi:response.data.diaChi,
                    gt:response.data.gt
                }
            }
        })
    }
}