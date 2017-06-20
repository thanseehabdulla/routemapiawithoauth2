"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var Observable_1 = require("rxjs/Observable");
var api_config_1 = require("./../../api_config/api_config");
require("jquery");
require("datatables.net");
var AdminComponent = (function () {
    function AdminComponent(router, http) {
        this.router = router;
        this.http = http;
        $(document).ready(function () {
            $('#example').DataTable();
        });
        $('#example').on('click', '#edit', function () {
        });
        this.loaddata();
    }
    // on init
    AdminComponent.prototype.ngOnInit = function () {
        this.loaddata();
    };
    // home page
    AdminComponent.prototype.home = function () {
        var notify = document.getElementById('addcustomer');
        notify.style.display = 'none';
        var main = document.getElementById('adminmain');
        main.style.display = 'block';
        var displass = document.getElementById('editcustomer');
        displass.style.display = 'none';
        this.loaddata();
    };
    // add customer plus button functionality
    AdminComponent.prototype.addcustomer = function () {
        var main = document.getElementById('adminmain');
        main.style.display = 'none';
        var notify = document.getElementById('addcustomer');
        notify.style.display = 'block';
        this.code = '';
        this.name = "";
        this.password = "";
        this.email = "";
        this.api = "";
        this.address = "";
        this.phone = "";
    };
    // logging out
    AdminComponent.prototype.logout = function () {
        sessionStorage.removeItem('adminUser');
        sessionStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.router.navigate(['/login']);
        console.log('logged out');
    };
    AdminComponent.prototype.dismiss = function () {
        var notify = document.getElementById('alerttag');
        notify.style.display = 'none';
    };
    AdminComponent.prototype.submitForm = function () {
        var _this = this;
        if (this.password == this.cpassword) {
            // get access token
            var urlaccess = api_config_1.API.API_AddCustomer;
            var body2 = "name=" + this.name + "&password=" + this.password + '&email=' + this.email + '&code=' + this.code + '&location=' + this.location + '&api=' + this.api + '&address=' + this.address + '&phone=' + this.phone;
            this.accesstoken = sessionStorage.getItem('access_token');
            var head2 = new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.accesstoken
            });
            this.http.post(urlaccess, body2, { headers: head2 })
                .map(function (res) { return res.json(); }).catch(function (e) {
                if (e.status === 401) {
                    return Observable_1.Observable.throw('Unauthorized');
                }
                // do any other checking for statuses here
            })
                .subscribe(function (data) {
                _this.home();
                _this.router.navigate(['/admin']);
            }, function (error) {
                if (error == "Unauthorized") {
                    console.log(error);
                    alert(error);
                }
                // var notify = document.getElementById('notifys');
                //  notify.style.display = 'block';
                $("#notifys").show();
                setTimeout(function () { $("#notifys").hide(); }, 5000);
                console.log(error);
            });
        }
        else {
            $("#notifys").show();
            setTimeout(function () { $("#notifys").hide(); }, 5000);
        }
    };
    AdminComponent.prototype.loaddata = function () {
        var _this = this;
        console.log('loaddata');
        var url = api_config_1.API.API_GetCustomer;
        this.accesstoken = sessionStorage.getItem('access_token');
        var head2 = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.accesstoken
        });
        this.http.get(url, {
            headers: head2
        })
            .map(function (res) {
            return res.json();
        }).catch(function (e) {
            if (e.status === 401) {
                return Observable_1.Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(function (data) {
            console.log(JSON.stringify(data));
            _this.display = Array();
            _this.display = data;
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    AdminComponent.prototype.remove = function (id) {
        var _this = this;
        console.log('deletedata');
        console.log(id);
        var url = api_config_1.API.API_RemoveCustomer + id;
        this.accesstoken = sessionStorage.getItem('access_token');
        var head2 = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.accesstoken
        });
        this.http.delete(url, {
            headers: head2
        })
            .map(function (res) {
            return res.json();
        }).catch(function (e) {
            if (e.status === 401) {
                return Observable_1.Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(function (data) {
            console.log(JSON.stringify(data));
            _this.loaddata();
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    AdminComponent.prototype.loadsingledata = function (id) {
        var _this = this;
        console.log('loaddata');
        var url = api_config_1.API.API_GetCustomer + id;
        this.accesstoken = sessionStorage.getItem('access_token');
        var head2 = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.accesstoken
        });
        this.http.get(url, {
            headers: head2
        })
            .map(function (res) {
            return res.json();
        }).catch(function (e) {
            if (e.status === 401) {
                return Observable_1.Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        }).subscribe(function (data) {
            console.log(JSON.stringify(data));
            _this.code = data.code;
            _this.name = data.username;
            _this.email = data.email;
            _this.api = data.api;
            _this.address = data.address;
            _this.phone = data.phone;
        }, function (error) {
            if (error == "Unauthorized") {
                alert(error);
                console.log(error);
            }
        });
    };
    AdminComponent.prototype.edit = function (id) {
        console.log('reached edit');
        sessionStorage.setItem('tempid', id);
        var main = document.getElementById('adminmain');
        main.style.display = 'none';
        var notify = document.getElementById('addcustomer');
        notify.style.display = 'none';
        var displass = document.getElementById('editcustomer');
        displass.style.display = 'block';
        this.loadsingledata(id);
    };
    AdminComponent.prototype.updateForm = function () {
        var _this = this;
        if (this.password == this.cpassword) {
            // get access token
            var id = sessionStorage.getItem('tempid');
            var urlaccess = api_config_1.API.API_UpdateCustomer + id;
            var body2 = "name=" + this.name + "&password=" + this.password + '&email=' + this.email + '&code=' + this.code + '&location=' + this.location + '&api=' + this.api + '&address=' + this.address + '&phone=' + this.phone;
            this.accesstoken = sessionStorage.getItem('access_token');
            var head2 = new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.accesstoken
            });
            this.http.put(urlaccess, body2, { headers: head2 })
                .map(function (res) { return res.json(); }).catch(function (e) {
                if (e.status === 401) {
                    return Observable_1.Observable.throw('Unauthorized');
                }
                // do any other checking for statuses here
            })
                .subscribe(function (data) {
                _this.home();
                _this.router.navigate(['/admin']);
            }, function (error) {
                if (error == "Unauthorized") {
                    console.log(error);
                    alert(error);
                }
                // var notify = document.getElementById('notifys');
                //  notify.style.display = 'block';
                $("#notifyss").show();
                setTimeout(function () { $("#notifyss").hide(); }, 5000);
                console.log(error);
            });
        }
        else {
            $("#notifyss").show();
            setTimeout(function () { $("#notifyss").hide(); }, 5000);
        }
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'admin',
        templateUrl: './admin.component.html',
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], AdminComponent);
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map