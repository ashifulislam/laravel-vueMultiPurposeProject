<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">User's profile </h3>

                        <div class="card-tools">
                                <button class="btn btn-success" @click="newModal">

                                    Add new user
                                    <i class="fas fa-user-plus"></i>
                                </button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Registered</th>

                                <th>Modify/Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="user in users.data" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.type}}</td>
                                <td>{{user.created_at}}</td>


                                <td>
                                    <a href="#" @click="editModal(user)">
                                        <i class="fa fa-edit blue"></i>
                                    </a>
                                    /

                                    <a href="#" @click="deleteUsers(user.id)">
                                        <i class="fa fa-trash black"></i>

                                    </a>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                        <pagination :data="users" @pagination-change-page="getResults"></pagination>

                    </div>

                </div>
                <!-- /.card -->
            </div>
        </div>


        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-show="!editMode" class="modal-title" id="addNewLabel">Add New User</h5>
                        <h5 v-show="editMode" class="modal-title" id="addNewLabel">Update The User</h5>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editMode ? updateUser()  : createUser()">


                    <div class="modal-body">
                        <!--Required to put the form here -->
                        <div class="form-group">
                            <input v-model="form.name" type="text" name="name"
                                placeholder="Enter your name"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name"></has-error>
                        </div>
                        <div class="form-group">
                            <input v-model="form.email" type="email" name="email"
                                   placeholder="Enter your email here"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email"></has-error>
                        </div>
                        <div class="form-group">
                            <textarea v-model="form.bio" type="text" name="bio"
                                   placeholder="Enter your bio here"
                                      class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                            <has-error :form="form" field="bio"></has-error>
                        </div>
                        <div class="form-group">
                            <select v-model="form.type" name="type" id="type"
                                   placeholder="Enter your email here"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                <option value="">
                                    select user role
                                </option>
                                <option value="admin">
                                    Admin
                                </option>
                                <option value="user">
                                    Standard User
                                </option>
                                <option value="author">
                                    Author
                                </option>
                            </select>
                            <has-error :form="form" field="type"></has-error>
                        </div>
                        <div class="form-group">
                            <input v-model="form.password" type="password" name="password"
                                   placeholder="Enter your password here"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <has-error :form="form" field="password"></has-error>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button v-show="!editMode" type="submit" class="btn btn-primary">Add New</button>
                        <button v-show="editMode" type="submit" class="btn btn-success">Update</button>

                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //variables
                editMode:false,
                //Here the user object is created
                users:{},
                form: new Form({
                    id:'',
                    name : '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        methods:{
            getResults(page = 1) {
                axios.get('api/user?page=' + page)
                    .then(response => {
                        this.users = response.data;
                    });
            },
            updateUser(id){
                // console.log('editing data');
                this.form.put('api/user/'+this.form.id)
                .then(()=>{
                //success message
                    $('#addNew').modal('hide');

                    swal.fire(
                        'updated!',
                        'Your file has been updated.',
                        'success'
                    )
                    //Here the event is created
                    Fire.$emit('afterCreate');
                }).catch(()=>{

                    })
            },
            editModal(user){
                this.editMode=true;
                //reset the form
                this.form.reset();
                $('#addNew').modal('show');
                this.form.fill(user);


            },
            newModal(){
                this.editMode=false;
                //reset the form
                this.form.reset();
                $('#addNew').modal('show');



            },
            loadUsers(){
                //made a get request with data
                axios.get("api/user").then(({ data }) => (this.users = data));
                },
            deleteUsers(id){
                swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    //Send request to the server
                    this.form.delete('api/user/'+id).then(()=>{
                        if (result.isConfirmed) {
                            swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            //Here the event is created
                            Fire.$emit('afterCreate');

                        }
                    }).catch(()=>{
                        swal("Failed","There was something mistakes")
                    });

                })
            },
           createUser(){
                //made post request
            this.form.post('api/user').then(()=>{
                //the event is initialized after creating the user
                Fire.$emit('afterCreate');

                //hide the modal window
                $('#addNew').modal('hide')
                //sweet alert handling
                toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })
            }).catch(()=>{

            })

            }
        },

        created() {
            Fire.$on('searching',() => {
                let query = this.$parent.search;
                axios.get('api/findUser?q=' + query)
                    .then((data) => {
                        this.users = data.data
                    })
                    .catch(() => {
                    })
            })
            //When the component is created this is called
            this.loadUsers();
            //After load the user here we fire on(updated)
            Fire.$on('afterCreate',()=>{
                this.loadUsers();
            });

            //page is refreshed in every 3 seconds
            // setInterval(()=>this.loadUsers(),3000);
        }
    }
</script>
