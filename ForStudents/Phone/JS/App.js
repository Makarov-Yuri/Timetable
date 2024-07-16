
//Если у пользователя еще не было записи о статусе авторизации, то ставим ее
if(localStorage.getItem('StatusOfAutorization')==null){
	
	localStorage.setItem('StatusOfAutorization', 'UserWasNotLoggedIn');
	
	console.log('Прописан статус авторизации');
	
}


/*
//Если пользователь авторизован, то выполняем указанные ниже действия
if(localStorage.getItem('StatusOfAutorization')=='UserWasLoggedIn'){
					
	//Если интернет работает, то при загрузке приложения в оперативную память заново скачиваем данные о расписании выбранной группы:

	if(navigator.onLine==true){
		
		
		//Делаем запрос на получение данных о расписании
		
							
	//Если интернет не работает, то выводим версию расписания, которая раходится в памяти браузера
	}else if(navigator.onLine==false){
		
							
	}				
				
}
			
*/




/*

//На этапе разработки используем "локальный" объект, который можно получить из JSON-объект для хранения данных о расписании группы:

//Данный объект будет получен из IndexBD в ходе составления запроса к ней
let DataOfTimetableForGroup={
	
	SemesterNumber:'1',//Номер семестра в году (январь - декабрь)
	
	Group:'125',
	
	Days:[//Массив с расписанием на каждый день
	
	//Дни недели в массиве:
	
		{//Первый день в неделе - Понедельник
			 
			 TypeOfDay:'WorkDay',
			 
			 Comment:'null',
			 
			 Lessons:[//Массив уроков в конкретном дне недели
				 
				  {//Один конкретный урок
					 
					 LessonNumber:'1',
					 
					 TimeOfLesson:'9:30-11:00',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Математика', Auditorium:'A-342',Teacher:'Косовская Н.Ю.'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Математика', Auditorium:'A-342',Teacher:'Косовская Н.Ю.'},
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Математика', Auditorium:'A-342',Teacher:'Косовская Н.Ю.'}, 
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Математика', Auditorium:'A-342',Teacher:'Косовская Н.Ю.'}
					  
				 },
				 
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'2',
					 
					 TimeOfLesson:'9:30-11:00',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Физика', Auditorium:'A-342',Teacher:'Демина М.Ю.'}, 
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Правоведение', Auditorium:'A-342',Teacher:'Жужома Ю.Н.'},
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Физика', Auditorium:'A-342',Teacher:'Демина М.Ю.'},
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Правоведение', Auditorium:'A-342',Teacher:'Жужома Ю.Н.'}
					  
				 },
				 
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'3',
					 
					 TimeOfLesson:'13:30-15:00',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Физика', Auditorium:'Б-502',Teacher:'Демина М.Ю.'}, 
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'Физ. химия', Auditorium:'Б-229',Teacher:'Пошвина Т.А.'}, 
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Физика', Auditorium:'Б-502',Teacher:'Демина М.Ю.'}, 
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'Физ. химия', Auditorium:'Б-229',Teacher:'Якубова О.С.'} 
					  
				 },
				 
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'4',
					 
					 TimeOfLesson:'15:10-16:40',
					 
					 FirstSubGroupTopWeek:{LessonExists:'NotExists'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'Физ. химия', Auditorium:'Б-229',Teacher:'Пошвина Т.А.'}, 
					 
					 SecondSubGroupTopWeek:{LessonExists:'NotExists'}, 
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'Физ. химия', Auditorium:'Б-229',Teacher:'Якубова О.С.'} 
					 	 
				 }
					 
			]
			 
		},
		
		
		
		
		
		
		
		
		
		
		{//Второй день в неделе - Вторник
			 
			 TypeOfDay:'WorkDay',
			 
			 Comment:'null',
			 
			 Lessons:[//Массив уроков в конкретном дне недели
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'1',
					 
					 TimeOfLesson:'9:30-11:00',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'МВ в ТОВ', Auditorium:'А-303',Teacher:'Жукова М.Н.'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'ХЗМОС', Auditorium:'Б-317',Teacher:'Вахрушев А.Ю.'}, 
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'ХЗМОС', Auditorium:'Б-317',Teacher:'Ардашева Л.П.'}, 
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'МВ в ТОВ', Auditorium:'А-303',Teacher:'Жукова М.Н.'} 
					 
					 
				 },
				 
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'2',
					 
					 TimeOfLesson:'11:10-12:40',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Математика', Auditorium:'А-311',Teacher:'Федорова Е.В.'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Математика', Auditorium:'А-311',Teacher:'Федорова Е.В.'}, 
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Математика', Auditorium:'А-311',Teacher:'Федорова Е.В.'}, 
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Математика', Auditorium:'А-311',Teacher:'Федорова Е.В.'} 
					 
					 
				 },
				 
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'3',
					 
					 TimeOfLesson:'13:30-15:00',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'МВ в ТОВ', Auditorium:'В-201',Teacher:'Евдокимов А.Н.'}, 
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'ХЗМОС', Auditorium:'В-201',Teacher:'Михайлова И.С.'},
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'МВ в ТОВ', Auditorium:'В-201',Teacher:'Евдокимов А.Н.'}, 
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'ХЗМОС', Auditorium:'В-201',Teacher:'Михайлова И.С.'} 
					 
					 
				 },
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'4',
					 
					 TimeOfLesson:'15:10-16:40',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'Физика', Auditorium:'Б-501',Teacher:'Деркачева О.Ю.'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'Физика', Auditorium:'Б-501',Teacher:'Деркачева О.Ю.'}, 
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'Физика', Auditorium:'Б-229',Teacher:'Крюков К.А.'},
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'Физика', Auditorium:'Б-229',Teacher:'Крюков К.А.'} 
					 
					 
				 }
					 
			]
			 
		},
		
		{//Третий день в неделе - Среда
			 
			 TypeOfDay:'Holiday',
			 
			 Comment:'День курсового проектирования',
			 
		},
		
		
		{//Четвертый день в неделе - Четверг
			 
			 TypeOfDay:'WorkDay',
			 
			 Comment:'null',
			 
			 Lessons:[//Массив уроков в конкретном дне недели
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'1',
					 
					 TimeOfLesson:'9:30-11:00',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Правоведение', Auditorium:'В-416',Teacher:'Жужома Ю.Н.'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Правоведение', Auditorium:'В-416',Teacher:'Жужома Ю.Н.'},
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Правоведение', Auditorium:'В-416',Teacher:'Жужома Ю.Н.'},
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Правоведение', Auditorium:'В-416',Teacher:'Жужома Ю.Н.'}
					 
					 
				 },
				 
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'2',
					 
					 TimeOfLesson:'11:10-12:40',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Иностранный язык', Auditorium:'В-517',Teacher:'Знаменская А.М.'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Иностранный язык', Auditorium:'В-517',Teacher:'Знаменская А.М.'},
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Иностранный язык', Auditorium:'Б-421',Teacher:'Сергеева К.Я.'},
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Иностранный язык', Auditorium:'Б-421',Teacher:'Сергеева К.Я.'}
					 
					 
				 },
				 
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'3',
					 
					 TimeOfLesson:'13:30-15:00',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'АХиФХМАвТОВ', Auditorium:'Б-306',Teacher:'Тихомирова И.Ю.'}, 
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'АХиФХМАвТОВ', Auditorium:'Б-306',Teacher:'Тихомирова И.Ю.'}, 
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Прикл. механика', Auditorium:'В-419',Teacher:'Томилова О.В.'},
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Прикл. механика', Auditorium:'В-419',Teacher:'Томилова О.В.'} 
					 
					 
				 },
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'4',
					 
					 TimeOfLesson:'15:10-16:40',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'АХиФХМАвТОВ', Auditorium:'Б-306',Teacher:'Тихомирова И.Ю.'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'АХиФХМАвТОВ', Auditorium:'Б-306',Teacher:'Тихомирова И.Ю.'},
					 
					 SecondSubGroupTopWeek:{LessonExists:'NotExists'}, 
					 
					 SecondSubGroupBottomWeek:{LessonExists:'NotExists'}
					 
					 
				 }
					 
			]
			 
		},
		
		
		
		{//Пятый день в неделе - Пятница
			 
			 TypeOfDay:'WorkDay',
			 
			 Comment:'null',
			 
			 Lessons:[//Массив уроков в конкретном дне недели
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'1',
					 
					 TimeOfLesson:'9:30-11:00',
					 
					 FirstSubGroupTopWeek:{LessonExists:'NotExists'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'ПМ', Auditorium:'В-419',Teacher:'Томилова О.В.'},
					 
					 SecondSubGroupTopWeek:{LessonExists:'NotExists'},
					 
					 SecondSubGroupBottomWeek:{LessonExists:'NotExists'}
					 
					 
				 },
				 
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'2',
					 
					 TimeOfLesson:'11:10-12:40',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Элективные курсы по физической культуре и спорту', Auditorium:'сп.зал',Teacher:'Петров С.П.'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Элективные курсы по физической культуре и спорту', Auditorium:'сп.зал',Teacher:'Петров С.П.'},
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Элективные курсы по физической культуре и спорту', Auditorium:'сп.зал',Teacher:'Петров С.П.'},
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'Элективные курсы по физической культуре и спорту', Auditorium:'сп.зал',Teacher:'Петров С.П.'}
					 
					 
				 },
				 
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'3',
					 
					 TimeOfLesson:'13:30-15:00',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Физическая химия', Auditorium:'А-342',Teacher:'Липин В.А.'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Физическая химия', Auditorium:'А-342',Teacher:'Липин В.А.'},
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Физическая химия', Auditorium:'А-342',Teacher:'Липин В.А.'},
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Физическая химия', Auditorium:'А-342',Teacher:'Липин В.А.'} 
					 
					 
				 },
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'4',
					 
					 TimeOfLesson:'15:10-16:40',
					 
					 FirstSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Практическое', NameOfSubject:'ПМ', Auditorium:'В-419',Teacher:'Томилова О.В.'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Прикладная механика', Auditorium:'А-342',Teacher:'Гребенникова В.М.'},
					 
					 SecondSubGroupTopWeek:{LessonExists:'NotExists'},
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лекция', NameOfSubject:'Прикладная механика', Auditorium:'А-342',Teacher:'Гребенникова В.М.'}
					 
					 
				 }
					 
			]
			 
		},
		
		
		{//Шестой день в неделе - Суббота
			 
			 TypeOfDay:'WorkDay',
			 
			 Comment:'null',
			 
			 Lessons:[//Массив уроков в конкретном дне недели
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'1',
					 
					 TimeOfLesson:'9:30-11:00',
					 
					 FirstSubGroupTopWeek:{LessonExists:'NotExists'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'NotExists'},
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'АХиФХМАвТОВ', Auditorium:'Б-306',Teacher:'Борисов А.Н.'},
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'АХиФХМАвТОВ', Auditorium:'Б-306',Teacher:'Борисов А.Н.'}
					 
					 
				 },
				 
				 
				 {//Один конкретный урок
					 
					 LessonNumber:'2',
					 
					 TimeOfLesson:'11:10-12:40',
					 
					 FirstSubGroupTopWeek:{LessonExists:'NotExists'},
					 
					 FirstSubGroupBottomWeek:{LessonExists:'NotExists'},
					 
					 SecondSubGroupTopWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'АХиФХМАвТОВ', Auditorium:'Б-306',Teacher:'Борисов А.Н.'},
					 
					 SecondSubGroupBottomWeek:{LessonExists:'Exists', TypeOfLesson:'Лабораторная', NameOfSubject:'АХиФХМАвТОВ', Auditorium:'Б-306',Teacher:'Борисов А.Н.'}
					 
					 
				 }
				 
					 
			]
			 
		},
		
		
		{//Седьмой день в неделе - Воскресенье
			 
			 TypeOfDay:'Holiday',
			 
			 Comment:'Выходной',
			 
		}
		
	]
	
}
*/


//console.log(DataOfTimetableForGroup);

//DataOfTimetableForGroupInJSON=JSON.stringify(DataOfTimetableForGroup);

//localStorage.setItem('DataOfTimetableForGroupInJSON', DataOfTimetableForGroupInJSON);


let DataOfTimetableForGroup=null;//Объявляем глобальную переменную с расписанием
	
//Объявляем глобальную переменную со списком преподавателей	
let ListOfTeachers;

if(localStorage.getItem('TeachersListInJSON')!=''){
	
	ListOfTeachers=JSON.parse(localStorage.getItem('TeachersListInJSON'));
	
	
}




const App = new Vue({

	el: '#App',
	
	store:store,// register the Vuex store globally
  
	components:{
	 
	'TimetableSection': VueComponentTimetableSection,
	 
	'ComponentsPanel':VueComponentComponentsPanel,
		
	'Settings':VueComponentSettings,
	
	'TeachersList':VueComponentTeachersList,
	
	'Enter':VueComponentEnter,
		
	  
  },
  
	data(){
		
			return{
			
			NameOfActiveSection:'TimetableSection',//Изначально активный раздел - раздел с расписанием группы
			
			//NameOfActiveSection:'TeachersList',//Изначально активный раздел - раздел с расписанием группы
			
			//UserIsAuthorized:false,//Переменная отвечает за то, авторизирован пользователь или нет
//-----------ЗАГРУЗОЧНЫЙ ЭКРАН(чтобы был нужен false)------------------------------------------------------------------------------------------------
			DataOfTimetableWasChecked:false,//Переменная показывает, что данные о расписании обновлены или нет
//-----------ЗАГРУЗОЧНЫЙ ЭКРАН-----------------------------------------------------------------------------------------------------------------------
			
		}
		
	},
	
	
	computed:{
		
		UserIsAuthorized:function(){//Переменная показывает авторизирован пользователь или нет
			
			if(this.$store.state.StatusOfAutorization=='UserWasLoggedIn'){
				
				//Если отображается часть шаблона, которую нужно показать авторизированному пользователю
				//то показываем сперва блок с расписанием
				this.NameOfActiveSection='TimetableSection';
				
				return true;
				
			}else if(this.$store.state.StatusOfAutorization=='UserWasNotLoggedIn'){
				
				return false;
				
			}
				
		}
		
		
	},
	
	
	created(){
		
		if(localStorage.getItem('StatusOfAutorization')=='UserWasLoggedIn'){
			
			if(navigator.onLine==true){
					
				let formData = new FormData();
				
				formData.append("Group", String(localStorage.getItem('SelectedGroup')).replace(/\s/g, ''));//Добавляем информацию в объект FormData()
					
				fetch('ForStudents/Phone/GroupIsExists.php',{
						
					method: 'POST',
						
					body:formData,
						
				}).then((response)=>{return response.text()}).then((ResponseCode)=>{
					
					if(Number(ResponseCode)==1){
						
						console.log('Группа существует, обновляем данные о расписании');
						
						let formData = new FormData();
						
						formData.append("Group", String(localStorage.getItem('SelectedGroup')).replace(/\s/g, ''));//Добавляем информацию в объект FormData()
									
						fetch('ForStudents/Phone/GetJSONDataOfTimetable.php',{
										
							method: 'POST',
										
							body:formData,
										
						}).then((response)=>{return response.text()}).then((DataOfTimetableForGroupInJSON)=>{
									
							//Записываем данные в localStorage
							localStorage.setItem('DataOfTimetableForGroupInJSON', DataOfTimetableForGroupInJSON);
							
							//Преобразуем JSON данные в объект JS
							DataOfTimetableForGroup=JSON.parse(DataOfTimetableForGroupInJSON);
							
							console.log(DataOfTimetableForGroup);
							
							console.log('Данные о расписании группы обновлены');
							
							//Загружаем данные в SubGroup
							this.$store.commit({
						
								type:'SetSubGroup',
						
								SubGroup: localStorage.getItem('SelectedSubGroup'),
						
							});
								
											
						}).then(()=>{
							
							console.log('Обновляем список преподавателей...');	
							
							fetch('ForStudents/Phone/GetListOfTeachers.php',{
										
								method: 'GET',
								
										
							}).then((response)=>{return response.text()}).then((TeachersListInJSON)=>{
							
								//Записываем данные о списке преподавателей в localStorage
								localStorage.setItem('TeachersListInJSON', TeachersListInJSON);
								
								//Записываем данные о расписании в глобальную переменную расписания группы:
								ListOfTeachers=JSON.parse(TeachersListInJSON);
								console.log('Список преподавателей записан в глобальную переменную!');
								
								
							})
								
						}).then(()=>{
							
							//Загружаем данные в StatusOfAutorization
							this.$store.commit({
								
								type:'SetStatusOfAutorization',
								
								StatusOfAutorization:'UserWasLoggedIn',
								
							});
							
							setTimeout(()=>{
								
								//Указываем, что данные о расписании были обновлены и можно загружать шаблон
								this.DataOfTimetableWasChecked=true;
							
							},1500);
							
						});
										
					}else if(Number(ResponseCode)==0){
						
						console.log('Такой группы не существует, разлогиниваемся');
								
						localStorage.setItem('StatusOfAutorization', 'UserWasNotLoggedIn');
						
						//Загружаем данные в SubGroup
						this.$store.commit({
						
							type:'SetSubGroup',
						
							SubGroup: localStorage.getItem('SelectedSubGroup'),
						
						});
						
						//Загружаем данные в StatusOfAutorization
						this.$store.commit({
							
							type:'SetStatusOfAutorization',
							
							StatusOfAutorization:'UserWasNotLoggedIn',
							
						});
									
					}
								
				});
			
			//Если интернет не работает, то записываем сохраненные данные о расписании в оперативную память:
			}else if(navigator.onLine==false){
				
				//Преобразуем JSON данные в объект JS
				DataOfTimetableForGroup=JSON.parse(localStorage.getItem('DataOfTimetableForGroupInJSON'));
				
				ListOfTeachers=JSON.parse(localStorage.getItem('TeachersListInJSON'));
				
				//Загружаем данные в SubGroup
				this.$store.commit({
							
					type:'SetSubGroup',
							
					SubGroup: localStorage.getItem('SelectedSubGroup'),
							
				});
				
				//Загружаем данные в StatusOfAutorization
				this.$store.commit({
							
					type:'SetStatusOfAutorization',
							
					StatusOfAutorization:'UserWasLoggedIn',
							
				});
				
				//Указываем, что данные о расписании были обновлены и можно загружать шаблон
				this.DataOfTimetableWasChecked=true;
				
			}
			
		}else if(localStorage.getItem('StatusOfAutorization')=='UserWasNotLoggedIn'){
			
			setTimeout(()=>{
				
			//Указываем, что данные о расписании были обновлены (или их нет) и можно загружать шаблон
			this.DataOfTimetableWasChecked=true;
				
			},1500);
			
		}			
		
	},
	
	

  
  template:`
  
  <div id='App'>
	  
	  <div v-if='!DataOfTimetableWasChecked' id='LoadingScreen'>
	  
		<img src='ForStudents/Phone/IMG/ЗнакВШТЭ.png'>
	  
	  </div>
	  
	  <div v-else-if='!UserIsAuthorized && DataOfTimetableWasChecked' id='WasNoAuthorized'>
	  
		<Enter></Enter>
		
	  </div>
	  
	  <div v-else-if='UserIsAuthorized && DataOfTimetableWasChecked' id='UserIsAuthorized'>
		  
		  <Settings v-show="NameOfActiveSection=='Settings'"></Settings>
		  
		  <TimetableSection v-show="NameOfActiveSection=='TimetableSection'"></TimetableSection>
		  
		  <TeachersList v-show="NameOfActiveSection=='TeachersList'"></TeachersList>
		  
		  <ComponentsPanel
			
			v-bind:NameOfActiveSection='NameOfActiveSection'
			
			v-on:ChangeActiveSection='ChangeActiveSection'
		  
		  ></ComponentsPanel>
		  
	  </div>
	  
  </div>
  
  `,
  
	methods:{

		ChangeActiveSection(NewActiveSection){
		 
		this.NameOfActiveSection=NewActiveSection;//Присваиваем переменной имени активного раздела имя только что нажатого раздела
		 
		}
	  	
	},
});









//Событие load на объекте window наступает, когда загрузилась вся страница, включая стили, картинки и другие ресурсы.
 window.onload = function() {
	
	document.body.style.visibility='visible';
	
	
 }
	