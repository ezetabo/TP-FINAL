## Alumno: `Taboada Ezequiel`
## Mi-app:  [< tp la clinica >]
## Mi-repo:  [< ezetabo-github >]

# `Trabajo Práctico FINAL - 2023 2do cuatri`

# Requerimientos de la aplicación  
_Debemos realizar un sistema según las necesidades y deseos del cliente, para eso tenemos una breve
descripción de lo que el cliente nos comenta acerca de su negocio.  
“La clínica OnLine, especialista en salud, cuenta actualmente con consultorios (6 en la actualidad),
dos laboratorios (físicos en la clínica), y una sala de espera general. Está abierta al público de lunes a
viernes en el horario de 8:00 a 19:00, y los sábados en el horario de 8:00 a 14:00.  
Trabajan en ella profesionales de diversas especialidades, que ocupan los consultorios acorde a su
disponibilidad, y reciben en ellos pacientes con turno para consulta o tratamiento. Dichos turnos son
pedidos por la web seleccionando el profesional o la especialidad. La duración mínima de un turno es
30 minutos.” pero los profesionales pueden cambiar la duración según su especialidad. Estos
profesionales pueden tener más de una especialidad.  
También contamos con un sector dentro de la clínica que se encarga de la organización y
administración de la misma._

>### sprint 1:
>_En esta entrega debemos tener la posibilidad de registrarse, ingresar al sistema y administrar los usuarios que van a poder utilizar nuestra plataforma._
>  * **Página de bienvenida**
>  * **Registro**
>    * *Para los pacientes*    
>    * *Para los Especialistas*    
>  * **Login**
>  * **Sección Usuarios**
>    * *solamente la va a poder ver el usuario con perfil Administrador*
>    * *podrá generar nuevos usuarios*
>    * *podrá generar un usuario Administrador*

---  

# `SPRINT 1  - Tareas desarrolladas y funcionamiento: `   

* Se creo una **interfaz unica** para los usuarios, la cual determina el comportamiento en base a la propiedad **_ROL_**, esto facilita el desarrollo de nuevos usuarios y el control de los mismos mediante un unico servicio.  

* El formulario de registro es un  modulo que contiene un **formulario reactivo** que se asegura de validar todos los campos mecesarios para la creacion de los distintos tipos de usuarios, este *formulario se adapta y muestra los distintos campos dependiendo de que tipo de usuario se desea crear*.

* Una vez logueado se ingresa a la pagina principal de la aplicacion, esto se encuentra dentro del modulo home, esta pagina muestra distinto contenido dependiendo del rol del usuario logueado.

* Se implementaron 3 guards para controlar si el usuario esta logueado, deslogueado o es admin.  

* Se creo un pipe personalizado para capitilizar la primer letra de cada palabra.  

* Las obras sociales y espacialidades se manejan con iterfaces propias, facilitando el mantenimiento y control de las mismas.  

* Cada seccion cuenta con su propio mudulo y se realiza la carga de los mismo utilizando Lazy Loading.  

### `Pagina de bienvenida`  
![welcome]  

Es la pagina que se muestra ni bien ingresamos a la app, desde aca podemos realizar el ingreso _(en caso de tener una cuenta validada y/o aprobada)_ o bien crear nuevas cuentas, tanto para pacientes como especialistas.  

---  
### `Login`  
![login]  

Es la pantalla que permite el acceso a la app, solo permite el ingreso si posee una cuanta con email verificado, en el caso de ser especialista se agrega la aprobacion previa de un administrador.
A su vez se incorporaron 3 botones extras para el ingreso rapido, cada boton describe el rol al que pertenece cada cuenta, _esto es importante_, ya que cada **rol determina que puede ver y/o hacer** dentro de la aplicación  

---  

### `Registro especialistas`

Desde aqui podemos crear nuevos especialistas, debe completar con todos sus datos y en formato valido, al momento de elegir especialidad, puede buscarla dentro de la lista o bien igresarla de forma manual.
Dado que las especialidades se encuentran controladas con el registro en la base de datos, si el se desea agregar una nueva especialidad que no existe en la lista esto es permitido y automaticamente se actualiza en la base.  
A su vez se controla que no este repetida tanto en la base, como en la seleccion que esta realizando el especialista.

| ![form-especialistas] | ![form-especialistas2] |  
|:---:|:---:|  

### `Registro pacientes`  

Desde aqui podemos crear nuevos pacientes, debe completar con todos sus datos y en formato valido.  
A diferencia de los especialistas, aca debemos seleccionar una obra social y dos imagenes.

![form-pacientes]  


### `Seccion usuarios`  

Los accesos del navbar se cargan de acuerdo al rol, solo un admin puede acceder a esta seccion.  
Desde esta seccion se puede registrar nuevos usuarios con los disntintos tipos de roles, incluido el de admin.  
Entrando a **_info usuarios_** se puede seleccionar un perfil y muestra la info completa de cada usuario, en esta seccion, si selecciona la lista de especialistas, puede habilitar o no el acceso del usuario sobre el cual se haga click.  

| ![lista-info] | ![lista-especialistas] |  
|:---:|:---:|  

### `Comunicacion con el usuario`  

Se utilizan ventanas emergentes personalizadas para cada situacion, por ejemplo:  

| ![exito-espc] | ![falta-aprobacion] |  
|:---:|:---:| 

| ![verificar-email] | ![exito-paciente] |  
|:---:|:---:| 












<!-- url -->
[< tp la clinica >]:https://tp-final-taboada2023.web.app/

[< ezetabo-github >]:https://github.com/ezetabo/TP-FINAL.git


<!-- Imagenes -->
[welcome]:https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Fwelcome_1699045995044?alt=media&token=dc9ffb89-09ca-45ef-b783-65221be5cc24

[login]:https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Flogin_1699046092253?alt=media&token=2f94edab-9eb5-4456-8a4d-f3310a93b0d6

[form-especialistas]:https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Fform-especialista_1699046149268?alt=media&token=7a84c2b3-7b8c-4644-bbb6-1be042b665fb

[form-especialistas2]:https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Fform-especialista2_1699046183958?alt=media&token=666a1c66-9eaf-4dc1-9729-b21c69386fdf

[form-admin]:https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Fform-admin_1699046210460?alt=media&token=376aac80-87c9-4859-9e7b-61af63d9192e

[form-pacientes]:https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Fform-paciente_1699046122615?alt=media&token=9a2c7588-2d05-46a8-9841-cf0efd0f0329

[menu]:https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Fmenu_1699046238310?alt=media&token=21bad9b5-1caa-471b-8838-3f890712e541

[lista-especialistas]:https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Flista-especialistas_1699046262894?alt=media&token=2f5eda8e-4445-4782-b6a2-cc06d09ef9e2

[lista-info]:https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Fseccion-info_1699130371333?alt=media&token=f7488528-357f-4dfc-a5b1-cc9cdf755e8b

[falta-aprobacion]:https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Ffalta-aprobacion_1699129266010?alt=media&token=666b2d70-8ee6-4658-a95b-067148fdc40d

[exito-espc]:https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Fexito-espec_1699129185168?alt=media&token=5bbd687a-9f0a-4202-bb22-1d94cbb10ec0

[verificar-email]:https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Fverificar-email_1699129241493?alt=media&token=c5a5104d-233d-4f3e-a1a5-6b2ff74410fb

[exito-paciente]:https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Fexito-paciente_1699129208464?alt=media&token=18d3f800-b967-4c86-b71e-298142d3aedc

