
import React, { Component } from 'react'
import axios from "axios";

import './Registration.css';
export default class Registernew extends Component {
    constructor(props) {
        super(props);
        this.state={
            country : "", state:"",city : "", errors: {}, formIsValid : true, submiterr:"",    str:"",
           
    }
  }
    
    
  

 

    onChange=(e) =>{
        var err=this.state.errors;
        err[e.target.name]="";
        this.setState({[e.target.name] : e.target.value, err});  
      }
      onblur=(e)=>{
          
        var err=this.state.errors;
        
        
        if(this.state[e.target.name] == undefined || this.state[e.target.name] == ""){
            err[e.target.name]="Please enter the value."
            this.setState({err, formIsValid:false,})
            if(this.state.str.indexOf(e.target.name)<0)
                {
                this.setState({str:this.state.str+e.target.name})    
                }
        }
        else{
            let reg, msg;
            switch(e.target.name)
            {
                case "fullname":
                    reg=/^[a-zA-Z ]*$/;
                    msg="*Please enter alphabet characters only.";break;
                case "address":
                    reg=/^[a-zA-Z0-9,.()\- ]*$/;
                    msg="*Please enter the valid address..";break;
                case "emailid":
                    reg=/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
                    msg="*Please enter valid email-ID.";break;
                case "mobileno":
                    reg=/^[0-9]{10}$/;
                    msg="*Please enter your mobile no.";break;
                case "password":
                    reg=/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;
                    msg="*Please enter secure and strong password.";break;
                case "pin":
                    reg=/^[0-9]{6}$/;
                    msg="*Please enter valid Pin code.";break;
               
            }
            if (!e.target.value.match(reg)) {
                err[e.target.name] = msg;
                if(this.state.str.indexOf(e.target.name)<0)
                {
                this.setState({str:this.state.str+e.target.name})    
                }
                this.setState({err, formIsValid:false,})
            }
            else{
                this.setState({str:this.state.str.replace(e.target.name,"")});
            }
        }
        this.setState({submiterr:""})
      }

      formsubmit=(e)=>{
        e.preventDefault();
        const {fullname,address,emailid,mobileno,password,pin}=this.state
        var country=document.getElementById("countryval").value;
        var state=document.getElementById("stateval").value
        var city=document.getElementById("cityval").value
          if(fullname!=undefined && address!=undefined && emailid!=undefined && mobileno!=undefined && pin!=undefined && password!=undefined  && this.state.str=="" && country!="" && state!="" && city!=""){
              var obj={
                userId:'dddddttttttt4444', //uniqe id
                fullName:this.state.fullname,
                mail:this.state.emailid,
                password:this.state.password,
                mobile:this.state.mobileno,
                userType:this.state.userType,
                address:this.state.address,
                pincode:this.state.pin,
                country:document.getElementById("countryval").value,
                state:document.getElementById("stateval").value,
                city:document.getElementById("cityval").value   
                }
                
                axios.post("http://18.222.201.97:5000/register",obj)
                    .then((res)=>{
                        if(res.status="200"){
                            console.log(res.data)
                            this.props.history.push("/home")
                        }
                        else{
                            console.log(res.status)
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })  
          }
          else {
            this.setState({submiterr:"please fill all the fields valid details"})
            
            return false;
          }
          
      }

      

    render() {
        return (
            <div id="main-registration-container">
                <div id="register">
                    <h3>Registration page</h3>
                    
                    
                       
                        <form method="post"  name="userRegistrationForm"  onSubmit={this.formsubmit} >
                        <label>Name</label>
                        <input type="text" name="fullname" value={this.state.fullname} onBlur={this.onblur} onKeyPress={this.keypress} onChange={this.onChange} />
                        <div className="errorMsg">{this.state.errors.fullname} </div>
                        
                        <label>Email ID:</label>
                        <input type="text" name="emailid" value={this.state.emailid} onChange={this.onChange} onBlur={this.onblur} onKeyPress={this.keypress}/>
                        <div className="errorMsg">{this.state.errors.emailid}</div>

                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.onChange} onBlur={this.onblur} onKeyPress={this.keypress}/>
                        <div className="errorMsg">{this.state.errors.password}</div>

                        <label>Mobile No:</label>
                        <input type="text" name="mobileno" value={this.state.mobileno} onChange={this.onChange}  onBlur={this.onblur} onKeyPress={this.keypress}/>
                        <div className="errorMsg">{this.state.errors.mobileno}</div>

                        <label>Address:</label>
                        <input type="text" name="address" value={this.state.address} onChange={this.onChange} onBlur={this.onblur} onKeyPress={this.keypress}/>
                        <div className="errorMsg">{this.state.errors.address}</div>
                        
                        <label>userType</label>
                        <input type="text" name="userType" vlaue={this.state.userType} onChange={this.onChange}></input>

                        <label>PIN Code:</label>
                        <input type="text" name="pin" placeholder="000000" value={this.state.pin} onChange={this.onChange} onBlur={this.onblur}  />
                        <div className="errorMsg">{this.state.errors.pin}</div>

                        <label>country</label>
                        <select id="country" name="country" class='form-control' ><option value="">-- Country --</option></select>
                        <div className="errorMsg">{this.state.country}</div>

                        <label>state</label>
                        <select id="region" name="state" class='form-control' ><option value="">-- State --</option></select>
                        <div className="errorMsg">{this.state.state}</div>

                        <label>city</label>
                        <select id="city" name="city" class='form-control' ><option value="">-- City --</option></select>
                        <input type="hidden" id="countryval"></input>
                        <input type="hidden" id="stateval"></input>
                        <input type="hidden" id="cityval"></input>
                        
                        <div className="errorMsg">{this.state.submiterr}</div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                </div>
            </div>
        )
    }
}
