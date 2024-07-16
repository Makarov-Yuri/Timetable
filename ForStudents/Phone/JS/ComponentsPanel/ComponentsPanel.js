/*
Панель компонентов необходима для изменения отображения компонентов, которые будут активны в разных режимах
На ней будут находится картинки, которые будут показывать все и активный ныне компонент
Она будет отображаться только после авторизации пользовтеля (когда пользователь зашел в расписание определенной группы)

*/



let VueComponentComponentsPanel={
	
	
	props:{
		
		//LessonDataObject:Object,//Объект данных урока
		
		NameOfActiveSection:String,
			
	},
	
	
	data(){
		
		return{
				
				
		}		
	},
	
	
	created(){
		

			
		
	},
	
	
	template:`
	
	<div id='ComponentsPanel'>
	
	<button class='Icon' v-on:click="IconOnclick('TimetableSection')">
	
		<img src='ForStudents/Phone/IMG/ActiveTimetableSection.png' v-if="NameOfActiveSection=='TimetableSection'">
		
		<img src='ForStudents/Phone/IMG/TimetableSection.png' v-else>
		
		<p>Расписание</p>
	
	</button>
	
	<button class='Icon' v-on:click="IconOnclick('TeachersList')">
		
		<img src='ForStudents/Phone/IMG/ActiveTeachersList.png' v-if="NameOfActiveSection=='TeachersList'">
		
		<img src='ForStudents/Phone/IMG/TeachersList.png' v-else>
		
		<p>Преподаватели</p>
	
	</button>
	
	<button class='Icon' v-on:click="IconOnclick('Settings')">
	
		<img src='ForStudents/Phone/IMG/ActiveSettings.png' v-if="NameOfActiveSection=='Settings'">
		
		<img src='ForStudents/Phone/IMG/Settings.png' v-else>
		
		<p>Управление</p>
	
	</button>
	
	

	</div>
		
		
	`,
	

	methods:{
		
		IconOnclick:function(NameOfSection){//При нажатии на любую из кнопок запускаем обработчик, получаем "имя" кнопки
			
			//Отправляем сообщение родительскому блоку о необходимости смены активного блока
			
			 this.$emit('ChangeActiveSection', NameOfSection);	
			
		}
			
			
	},
	
	
	mounted(){

	
	},
	
	
}



























