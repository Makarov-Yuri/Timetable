

ScrollSnap=new ScrollSnap({
	
	Container:'#Container',	//Передаем CSS селектор на объект, который должен быть контейнером
		
	CriticalShift:50,//Передаем критический сдвиг

	DurationOfAnimation:300,//Передаем продолжительность анимаций
	
	NumberOfBlockForInitialInstallationInCenterOfContainer:1,//Передаем номер блока, который изначально будет установлен в центре контейнера
		
});


ScrollSnap.StartFunctionIfFirstChildrenBlockWasReached=()=>{
			
	console.log('был достигнут первый блок, положение скролла:'
		
		+ScrollSnap.Container.scrollLeft
		
	);
	
	setTimeout(()=>{
		
		ScrollSnap.SetBlockInCenterOfContainer(1);
		
		console.log('Центрирование по 1 блоку');},200);
		
},



ScrollSnap.StartFunctionIfLastChildrenBlockWasReached=()=>{
				
	console.log('был достигнут последний блок, положение скролла:'
		
		+ScrollSnap.Container.scrollLeft
		
	);
	
	setTimeout(()=>{
		
		ScrollSnap.SetBlockInCenterOfContainer(1);
		
		console.log('Центрирование по 1 блоку');},200);
		
};


















