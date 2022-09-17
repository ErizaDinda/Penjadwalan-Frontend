<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        MAIN MENU 
                        <hr>
                        <ul class="list-group">
                            <router-link :to="{name: 'post.dashboard'}"
                            class="list-group-item text-dark text-decoration-none">DASHBOARD</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'post.jadwal'}"
                            class="list-group-item text-dark text-decoration-none">JADWAL</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'post.dashboard'}"
                            class="list-group-item text-dark text-decoration-none">DOSEN</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'post.dashboard'}"
                            class="list-group-item text-dark text-decoration-none">HARI</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'post.index'}"
                            class="list-group-item text-dark text-decoration-none">JAM</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'post.dashboard'}"
                            class="list-group-item text-dark text-decoration-none">RUANG</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'post.dashboard'}"
                            class="list-group-item text-dark text-decoration-none">MATKUL</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'post.dashboard'}"
                            class="list-group-item text-dark text-decoration-none">PENGAMPU</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'post.dashboard'}"
                            class="list-group-item text-dark text-decoration-none">JADKUL</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'post.index'}"
                            class="list-group-item text-dark text-decoration-none">WAKTU TIDAK BERSEDIA</router-link>
                            <li @click.prevent="logout" class="list-group-item text-dark text-decoration-none" 
                            style="cursor:pointer">LOGOUT</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- <Form @submit.prevent="generate">
              <Row class="mt-3 form-group">
                <Col :sm="3">
                  <FormSelect v-model="input.semester" size="sm" class="mb-3 form-control">
                    <option class="small text-medium-emphasis">Semester</option>
                    <option value="2">2</option>
                    <option value="semester % 2 = 0">Genap</option>
                  </FormSelect>
                  <div v-if="validation.semester" class="alert alert-danger">
                    {{validation.jenis[0]}}
                  </div> -->
                <!-- </Col>
                <Col :sm="3" class="d-none d-md-block">
                  <FormSelect v-model="input.tahun_akademik" size="sm" class="mb-3 form-control">
                    <option class="small text-medium-emphasis">Tahun Akademik</option>
                    <option value="2011-2012">2011 - 2012</option>
                    <option value="2011-2012">2012 - 2012</option>
                  </FormSelect>
                </Col>
                <Col :sm="2" class="d-none d-md-block">
                  <Button color="primary" type="submit">
                    Buat Jadwal
                    <Icon icon="cil-calendar" class="ms-2"/>
                  </Button>
                </Col>
              </Row>
            </Form> --> 
            <div class="col-md-8">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>PENJADWALAN</h4>
                        <form @submit.prevent="generate"> 
                            <select v-model="input.semester" size="sm" class="mb-3 form-control">
                                <option class="small text-medium-emphasis">Semester</option>
                                <option value="2">2</option>
                                <option value="2">Genap</option>
                            </select>
                            <select v-model="input.tahun_akademik" size="sm" class="mb-3 form-control">
                                <option class="small text-medium-emphasis">Tahun Akademik</option>
                                <option value="2011-2012">2011 - 2012</option>
                                <option value="2011-2012">2012 - 2012</option>
                            </select>
                            <button type="submit" class="btn btn-info text-light">Acak Jadwal <i class="fas fa-shuffle"></i></button>
                        </form>
                        <table class="table table-striped table-bordered mt-4">
                            <thead>
                                <tr>
                                    <th>Hari</th>
                                    <th >Sesi</th>
                                    <th >Jam</th>
                                    <th >Mata Kuliah</th>
                                    <th >SKS</th>
                                    <th >Semester</th>
                                    <th >Kelas</th>
                                    <th >Dosen</th>
                                    <th >Ruang</th>                                   
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(post, index) in posts" :key="index">
                                    <td>{{post.hari}}</td>
                                    <td>{{post.sesi}}</td>
                                    <td>{{post.jam_kuliah}}</td>
                                    <td>{{post.nama_mk}}</td>
                                    <td>{{post.sks}}</td>
                                    <td>{{post.semester}}</td>
                                    <td>{{post.kelas}}</td>
                                    <td>{{post.dosen}}</td>
                                    <td>{{post.ruang}}</td>
                                </tr>
                            </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    // import { onMounted, ref } from 'vue'
    import { onMounted,reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    export default {
        setup() {
            //state token
                const token = localStorage.getItem('token')
                //inisialisasi vue router on Composition API
                const router = useRouter()
                
                //state user
                const user = ref('')
            //reactive state
            const validation = ref([])
            let posts = ref([])
            const input = reactive({
            semester: '',
            tahun_akademik: ''
        })
            //mounted
            onMounted(() => {
                    //check Token exist
                    if(!token) {
                    return router.push({
                    name: 'login'
                })
            }
            
                //get data user
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                axios.get('http://localhost:8000/api/test')
                .then(response => {
               //assign state posts with response data
                posts.value = response.data.data         
                }).catch(error => {
                    console.log(error.response.data)
                })
            })
    
            function generate(){
                let semester = input.semester
                let tahun_akademik = input.tahun_akademik

                // console.log(semester);
                // console.log(tahun_akademik);
                axios.post('http://localhost:8000/api/penjadwalan', {
                        semester: semester,
                        tahun_akademik: tahun_akademik
                    }).then(() => {
                        alert("Data sukses dibuat");
                        window.location.reload();
                    })
                    .catch(error => {
                    alert("Gagal");
                        //assign state validation with error 
                        validation.value = error.response.data
                    })
                }       
    
            //method logout
            function logout() {
            //logout
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.post('http://localhost/Penjadwalan/Penjadwalan-Backend/public/api/logout')
            .then(response => {
            if(response.data.success){
                //remove localStorage
                localStorage.removeItem('token')
                //redirect ke halaman login
                return router.push({
                    name : 'login'
                })
            }
        })
            .catch(error => {
            console.log(error.response.data)
        })
    }

        
        return {
            token, 
            posts,
            generate,
            logout,
            input,
            validation
        }
     }
    }
    </script>

<style>
    body{
        background: lightgray;
    }
</style>