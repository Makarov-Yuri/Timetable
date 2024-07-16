


let VueComponentTeachersList={
	
	
	data(){
		
		return{
			
			DataOfTeacherIsActive:false,
			
			ErrorText:'',
			
			ErrorExists:false,
			
			SurNameOfTeacher:'',
			NameOfTeacher:'',
			PatronymicOfTeacher:'',
			FullNameOfTeacher:'',
			PostOfTeacher:'',
			DepartmentOfTeacher:'',
			EmailOfTeacher:'',
			
			inputNameOfTeacher:'',
			
			PathToPhotoOfTeacher:'',
				
		}		
	},
	

	
	created(){
		
		
		
	},
	
	
	template:`
	
	<div id='TeachersList'>
		
		<div id='Input' v-if='DataOfTeacherIsActive==false'>
			<input type='text' placeholder='Введите имя преподавателя' v-model='inputNameOfTeacher'>
		</div>
		
		<p
				
			v-if=
					'
						
						DataOfTeacherIsActive==false 
						&& 
						TeacherNeedToShow(
						Teacher.SurName,
						Teacher.Name,
						Teacher.Patronymic,
						inputNameOfTeacher)==true
					
					'
					
				class='TeacherString'
				
				v-bind:key='Teacher.NumberID-1'
				
				v-on:click='clickToTeacherString(Teacher.NumberID)'
				
				v-for='Teacher in ListOfTeachers'
				
		>{{Teacher.SurName}} {{Teacher.Name}} {{Teacher.Patronymic}}</p>
		
		<div class='DataOfTeacher' v-if='DataOfTeacherIsActive==true'>
			
			<div class='IMGBlock'><img  v-bind:src='PathToPhotoOfTeacher'></div>
			
			<div class='DataBlock'>
				
				<p>Фамилия: {{SurNameOfTeacher}}</p>
				
				<p>Имя: {{NameOfTeacher}}</p>
				
				<p>Отчество: {{PatronymicOfTeacher}}</p>
				
				<p>Должность: {{PostOfTeacher}}</p>
				
				<p>Кафедра: {{DepartmentOfTeacher}}</p>
				
				<p>Почта: {{EmailOfTeacher}}</p>
						
			</div>
		
		</div>
		
		<div class='ErrorMessage' v-if='ErrorExists==true'>{{ErrorText}}</div>
		
	</div>

	`,
	

	methods:{
		
		clickToTeacherString:function(NumberID){
			
			//Запрос на получение информации о преподавателе
			
			if(navigator.onLine==true){
				
				let formData = new FormData();
				formData.append("NumberID",NumberID);//Добавляем информацию в объект FormData()
							
				fetch('ForStudents/Phone/GetJSONDataOfTeacher.php',{
								
					method: 'POST',
							
					body:formData,
								
				}).then((response)=>{return response.text()}).then((StringOfTeacherInJSON)=>{
					
					StringOfTeacher=JSON.parse(StringOfTeacherInJSON);
					
					this.SurNameOfTeacher=StringOfTeacher.SurName;
					this.NameOfTeacher=StringOfTeacher.Name;
					this.PatronymicOfTeacher=StringOfTeacher.Patronymic;
					this.FullNameOfTeacher=StringOfTeacher.FullName;
					this.PostOfTeacher=StringOfTeacher.Post;
					this.DepartmentOfTeacher=StringOfTeacher.Department;
					this.EmailOfTeacher=StringOfTeacher.Email;
							
					this.PathToPhotoOfTeacher=`ForStudents/Phone/Teachers/Фотографии/
					`+this.DepartmentOfTeacher+` Фотографии сотрудников/`+this.SurNameOfTeacher+`.jpg`;
					
					//alert()
					
					
					this.DataOfTeacherIsActive=true;
					
					//Записываем в историю аналогичную страницу
					window.history.pushState('', '');
					
					//Далее, при переходе назад,если активна страница преподавателя, то деактивируем ее
					
					window.addEventListener('popstate', (event) => {
						
						if(this.DataOfTeacherIsActive==true){
							
							this.DataOfTeacherIsActive=false;
							
						}
						
					});
										
				});
							
			}else if(navigator.onLine==false){
				
				this.ErrorExists=true;
									
				this.ErrorText='Нет подключения к сети';
						
				setTimeout(()=>{
							
					this.ErrorExists=false;
									
					this.ErrorText='';
							
							
					},2000);	
					
				}
				
			},
			
			
			
			TeacherNeedToShow(SurNameOfTeacher,NameOfTeacher,PatronymicOfTeacher,NameOfNeedTeacher){
					
					
				if(NameOfNeedTeacher!=''){
					
					//replace(/\s/g, '') - Убрать пробелы

					let SubStr=NameOfNeedTeacher;

					//Делаем подстроку в нижнем регистре
					SubStr=SubStr.toLowerCase();
					//Убираем у подстроки пробелы
					SubStr=SubStr.replace(/\s/g, '');

					let Str_Span_1=SurNameOfTeacher;

					let Str_Span_2=NameOfTeacher;

					let Str_Span_3=PatronymicOfTeacher;


					//Делаем строки в нижнем регистре
					Str_Span_1=Str_Span_1.toLowerCase();

					Str_Span_2=Str_Span_2.toLowerCase();

					Str_Span_3=Str_Span_3.toLowerCase();

					//Убираем у строк пробелы

					Str_Span_1=Str_Span_1.replace(/\s/g, '');

					Str_Span_2=Str_Span_2.replace(/\s/g, '');

					Str_Span_3=Str_Span_3.replace(/\s/g, '');

					if(

						Str_Span_1.includes(SubStr)==true

						||

						Str_Span_2.includes(SubStr)==true

						||

						Str_Span_3.includes(SubStr)==true

						||

						(Str_Span_1+Str_Span_2).includes(SubStr)==true

						||

						(Str_Span_1+Str_Span_2+Str_Span_3).includes(SubStr)==true

					){return true}else{return false}
					
					
				}else if(NameOfNeedTeacher==''){
					
					return true;
					
				}
					
			},	
				
	},
		
}












