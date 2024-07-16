


let VueComponentEnter={
	
	data(){
		
		return{
			
			Group:null,
			
			SubGroup:null,
			
			ErrorExists:false,
			
			ErrorText:'',
				
		}		
	},
	
	
	computed:{
		
		StyleObjectForButton:function(){
			
			if(this.Group!=null && String(this.Group).length>=3 && (this.SubGroup==1 || this.SubGroup==2)){
				
				return{
					
					color:'white',
					
					background:'green',
					
					 fontWeight: 'bold',
					
				}
				
			}
			
		}
		
		
	},
	
	
	
	created(){
		
	},
	
	
	
	template:`
	<div id='Enter'>
	
		<h1>Расписание ВШТЭ</h1>
	
	
	<div id='InputCenter'>
		<input type='text'  placeholder="Номер группы" v-model='Group'>
		
		<input type='text'  placeholder="Номер подгруппы" v-model='SubGroup'>
		
		<input type="button" value="Перейти к расписанию" v-on:click='GoToTimetable' v-bind:style='StyleObjectForButton'>
		
		<p v-if='ErrorExists' id='ErrorMessage'>{{ErrorText}}</p>
		
	</div>
	
		<div id='IMG'>
			
			<img src='ForStudents/Phone/IMG/Здание.png'>
			
		</div>
		
	</div>
		
		
	`,
	

	methods:{
		
		GoToTimetable:function(){
			
			//Проверка, есть ли интернет
			
			//Проверка на то, активна ли кнопка
			if(this.Group!=null && String(this.Group).length>=3 && (this.SubGroup==1 || this.SubGroup==2)){
					
				console.log('Кнопка может быть нажата');
									
				if(navigator.onLine==true){
					
					console.log('Интернет работает');
					
					let formData = new FormData();
					formData.append("Group", String(this.Group).replace(/\s/g, ''));//Добавляем информацию в объект FormData()
					
					fetch('ForStudents/Phone/GroupIsExists.php',{
						
						method: 'POST',
						
						body:formData,
						
					}).then((response)=>{return response.text()}).then((ResponseCode)=>{
						
						if(Number(ResponseCode)==1){
							
							//Получаем информацию о расписании
								
							console.log('Начало скачивания JSON данных');
								
								this.GetJSONDataOfTeacherList
								
							this.GetJSONDataOfTimetable().then(this.GetJSONDataOfTeacherList()).then(()=>{
								
								console.log('Данные получены, можно начать:авторизировываться');
								this.Authorization();
								
							});
										
										
						}else if(Number(ResponseCode)==0){
										
							console.log('Такой группы не существует');
									
							this.ErrorExists=true;
											
							this.ErrorText='Неверный идентификатор группы';
															
							setTimeout(()=>{
												
								this.ErrorExists=false;
														
								this.ErrorText='';
								
							},2000);
							
						}
						
					});
						
				}else if(navigator.onLine==false){
							
						console.log('Отсутствует соединение с интернетом');
						
						this.ErrorExists=true;
									
						this.ErrorText='Отсутствует соединение с интернетом';
						
						setTimeout(()=>{
							
							this.ErrorExists=false;
									
							this.ErrorText='';
							
							
							},2000);
								
				}
			}else{
					
				this.ErrorExists=true;
									
				this.ErrorText='Введите группу и подгруппу';
						
				setTimeout(()=>{
							
					this.ErrorExists=false;
									
					this.ErrorText='';
							
							
					},2000);	
					
				}
					
			},
			
			
			
			GetJSONDataOfTimetable:function(){
				
				console.log('JSON данные с расписанием скачиваются...');
					
				return new Promise((resolve, reject)=>{
							
						let formData = new FormData();
						formData.append("Group", String(this.Group).replace(/\s/g, ''));//Добавляем информацию в объект FormData()
							
						fetch('ForStudents/Phone/GetJSONDataOfTimetable.php',{
								
							method: 'POST',
								
							body:formData,
								
						}).then((response)=>{return response.text()}).then((DataOfTimetableForGroupInJSON)=>{
							
							//Записываем данные о расписании группы в localStorage
							localStorage.setItem('DataOfTimetableForGroupInJSON', DataOfTimetableForGroupInJSON);
								
							//Записываем номер выбранной группы в localStorage
							localStorage.setItem('SelectedGroup', JSON.parse(localStorage.getItem('DataOfTimetableForGroupInJSON')).Group);
							
							//Записываем данные о расписании в глобальную переменную расписания группы:
							DataOfTimetableForGroup=JSON.parse(DataOfTimetableForGroupInJSON);
							console.log('Расписание записано в глобальную переменную!');
							
							//Записываем в localStorage название института
							localStorage.setItem('NameOfInstitute', DataOfTimetableForGroup.NameOfInstitute);

							//Записываем в localStorage курс
							localStorage.setItem('Course', DataOfTimetableForGroup.Course);
								
							
							//Записываем в localStorage семестр
							localStorage.setItem('SemesterNumber', DataOfTimetableForGroup.SemesterNumber);
							
							console.log('JSON данные о расписании получены');
							
							console.log(DataOfTimetableForGroup.NameOfInstitute);
							
							resolve();
								
						});
							
					})	
							
			},
			
			
			
			GetJSONDataOfTeacherList:function(){
				
				console.log('JSON данные со списком преподавателей скачиваются...');
					
				return new Promise((resolve, reject)=>{
						
						fetch('ForStudents/Phone/GetListOfTeachers.php',{
								
							method: 'GET',
								
						}).then((response)=>{return response.text()}).then((TeachersListInJSON)=>{
							
							//Записываем данные о списке преподавателей в localStorage
							localStorage.setItem('TeachersListInJSON', TeachersListInJSON);
							
							//Записываем данные о расписании в глобальную переменную расписания группы:
							ListOfTeachers=JSON.parse(TeachersListInJSON);
							console.log('Список преподавателей записан в глобальную переменную!');
							
							resolve();
								
						});
							
					})	
				
			},
			
			Authorization:function(){
				
				localStorage.setItem('StatusOfAutorization', 'UserWasLoggedIn');
				
				//Записываем номер выбранной подгруппы в localStorage
				localStorage.setItem('SelectedSubGroup', String(this.SubGroup));
				
				//Загружаем данные в SubGroup
				this.$store.commit({
					
					type:'SetSubGroup',
					
					SubGroup: String(this.SubGroup),
					
				});
				
				//Загружаем данные в StatusOfAutorization
				this.$store.commit({
					
					type:'SetStatusOfAutorization',
					
					StatusOfAutorization:'UserWasLoggedIn',
					
				});
				
			},
			
		},
	
}









