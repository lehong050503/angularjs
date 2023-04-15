window.NhanVienController = function($scope,$routeParams,$http,$location){
    $scope.title = "Quản lý nhân viên";

    let apiUrl = "http://localhost:3000/nhanVien";
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
            gt:"",
            tuoi:"",
            tien:""
        }
        $scope.editId = 0;
    }

    $scope.add = function(){

        let flag = false;

        $scope.validate = {
            ten:false,
            gt:false,
            tuoi:false,
            tien:false
        }

        if(!$scope.inPV || !$scope.inPV.ten){
            $scope.validate.ten = true;
            flag = true;
        }
        if(!$scope.inPV || !$scope.inPV.gt){
            $scope.validate.gt = true;
            flag = true;
        }
        if(!$scope.inPV || !$scope.inPV.tuoi){
            $scope.validate.tuoi = true;
            flag = true;
        }
        if(!$scope.inPV || !$scope.inPV.tien){
            $scope.validate.tien = true;
            flag = true;
        }

        if(!flag){
            let editId = $routeParams.id;

            if(editId){
                let updateItem = {
                    ten:$scope.inPV.ten,
                    gt:$scope.inPV.gt,
                    tuoi:$scope.inPV.tuoi,
                    tien:$scope.inPV.tien
                }
                $http.put(`${apiUrl}/${editId}`,updateItem).then(function(response){
                    $scope.getData();
                    $location.path('/nhanVien');
                })
                $scope.onClose();
                return;
            }

            let ds = $scope.danhSach;
            let newId = ds.length > 0 ? ds[ds.length-1].id + 1 : 1;
            let newItem = {
                id:newId,
                ten:$scope.inPV.ten,
                gt:$scope.inPV.gt,
                tuoi:$scope.inPV.tuoi,
                tien:$scope.inPV.tien
            }
            $http.post(apiUrl,newItem).then(function(response){
                $scope.getData();
                alert('Them thanh cong');
                $location.path('/nhanVien');
            })
        }

    }

    $scope.edit = function(editId){
        $location.path(`/nhanVien/edit/${editId}`);
    }
    if($routeParams.id){
        $http.get(`${apiUrl}/${$routeParams.id}`).then(function(response){
            if(response.status == 200){
                $scope.inPV = {
                    ten:response.data.ten,
                    gt:response.data.gt,
                    tuoi:response.data.tuoi,
                    tien:response.data.tien
                }
            }
        })
    }
    $scope.del = function(deleteId){
        $scope.deleteId = deleteId;
        let confirm = window.confirm("Xóa nhé");
        if(confirm){
            $http.delete(`${apiUrl}/${deleteId}`).then(function(response){
                $scope.getData();
                alert('Xóa thành công');
                $location.path('/nhanVien');
            })
        }
    }
}