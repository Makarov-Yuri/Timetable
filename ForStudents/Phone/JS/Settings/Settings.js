


let VueComponentSettings={
	
	
	data(){
		
		return{
			
			nameOfInstitute:localStorage.getItem('NameOfInstitute'),
			course:localStorage.getItem('Course'),
			semester:localStorage.getItem('SemesterNumber'),
			group:localStorage.getItem('SelectedGroup'),
			selectedSubGroup:localStorage.getItem('SelectedSubGroup'),
				
		}		
	},
	
	
	watch:{
		
		selectedSubGroup:function(){
			
			//Изменяем номер выбранной подгруппы в постоянной памяти
			localStorage.setItem('SelectedSubGroup', String(this.selectedSubGroup));
			
			//Изменяем номер выбранной подгруппы в оперативной памяти
			this.$store.commit({
						
				type:'SetSubGroup',
						
				SubGroup: localStorage.getItem('SelectedSubGroup'),
						
			});
			
		}
	},
	
	
	
	created(){
		

			
		
	},
	
	
	template:`
	
	<div id='Settings'>
	
	
	<div id='InformationOfGroup'>{{nameOfInstitute}}, {{course}} курс, {{semester}} семестр</div>
	
	<div id='Exit'>
	
		<img src='ForStudents/Phone/IMG/LogOut.png' v-on:click='Exit'>
		
		<p v-on:click='Exit'>Выйти</p>
		
	</div>
	
	<div id='ChangeSubgroup'>
		<p class='Group'>Группа:{{group}}</p>
		
		<div class="form_radio">
		<input id="radio-1" type="radio" name="radio" value='1' v-model='selectedSubGroup'>
		<label for="radio-1">Первая подгруппа</label>
		</div>
	 
		<div class="form_radio">
			<input id="radio-2" type="radio" name="radio" value='2' v-model='selectedSubGroup'>
			<label for="radio-2">Вторая подгруппа</label>
		</div>
		
	</div>
	
	</div>
		
		
	`,
	

	methods:{
		
		
		ChangeSendingNotifications:function(){
			
			this.$refs.ChangeSendingNotifications.classList.toggle('switch-on');
			
		},
		
		Exit:function(){
			
			//Очищаем данные для выхода
			
			localStorage.setItem('StatusOfAutorization', 'UserWasNotLoggedIn');
			
			localStorage.setItem('DataOfTimetableForGroupInJSON', '');
			
			localStorage.setItem('SelectedGroup', '');
			
			localStorage.setItem('SelectedSubGroup', '');
			
			localStorage.setItem('NameOfInstitute','');
			
			localStorage.setItem('Course', '');
			
			localStorage.setItem('SemesterNumber', '');
			
			localStorage.setItem('TeachersListInJSON', '');
			
			
			//Загружаем данные в StatusOfAutorization
			this.$store.commit({
				
				type:'SetStatusOfAutorization',
				
				StatusOfAutorization:'UserWasNotLoggedIn',
				
			});
				
		},
		
			
	},
	
	
	mounted(){

	
	},
	
	
}

/*

<div id='SendingNotifications'>
	
		<p>Уведомлять об изменениях в расписании</p>
		
		<div class="switch-btn switch-on" v-on:click="ChangeSendingNotifications" ref='ChangeSendingNotifications'></div>
		
</div>


*/




















