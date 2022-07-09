<h1>Getting started</h1>
<ul>
    <li>Install dependencies</li>
</ul>

```
npm install
```
<ul>
    <li>Run  the project</li>
</ul>

```
nodemon index
```

<h2>Authentication</h2>
<p><b>Registration: </b>
If you hit "localhost:3000/user"-in this URL with a name, email, password and role in JSON format such as 
{
    "name":"liza",
    "email": "l@gmail.com",
    "password": "1234567",
    "role":"user"
}
 you will register in the system. Role can be user or admin. While inserting the password it will encrypt the password and then it will insert into the database. When you register to the system you will receive a JSON web token. If you try to register with the same email address you will get an error.</p>
 <hr/>
 <p> <b>Login: </b>
 When you will visit "localhost:3000/auth"-in this URL with your correct email and password you will get a JSON web token. If the email or password is wrong you will get an error.</p>
<h2>Authorization</h2>
<p><b>Profile:</b> If you visit "localhost:3000/user/me"-this URL with the JSON web token that you received at the time of login or registration, you will able to see your own information. If the JSON web token is wrong or invalid you will get an error. You can put the JSON web token in the Header of the postman.</p>
<hr/>
<p>This system have another collection named student where information of the all student have stored.
If you visit "localhost:3000/student"-this URL with the JSON web token that you received at the time of login or registration, you will able to see all student's information. If the JSON web token is wrong or invalid you will get an error.</p>
<hr/>
<p>
If you visit "localhost:3000/student"-in this URL with any student id like this "localhost:3000/student/62c7156d72d62d6e52256d3d" with the JSON web token that you received at the time of login or registration , you will able to delete that particular student's information. But there is a condition that the user must be an admin, that is, the role of user must be admin. Normal user can not delete student information</p>

<h3>Before run the project you have to install:</h3>

```
npm i express
npm i mongoose 
npm i bcryptjs
npm i jsonwebtoken
npm i dotenv
```