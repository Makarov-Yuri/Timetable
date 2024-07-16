

//ScrollSnap


class ScrollSnap{
	
	//Объявляем поля класса и присваиваем им начальные(дефолтные) значения:
	
	//Ссылка на объект контейнера, горизонтальный скролл которого будет контролироваться объектом класса ScrollSnap
	Container=null;//По умолчанию ссылка не известна, поэтому она принимается равной null
	
	//Переменная для хранения координаты середины контейнера
	CoordinateOfMiddleOfContainer=0;
	
	//Для работы всех функций используется массив только активных дочерних блоков(дочерних блоков, у которых style.display не равен none
	//то есть эти блоки может "видеть" пользователь и они могут взаимодействовать с другими блоками), они образуют массив блоков, порядок
	//нумерации при этом остается прежним (блок по счету идущий раньше в массиве дочерних блоков в DOM остается "раньше" в массиве активных болков), 
	//что и в DOM, но номера могут быть меньше,так как блок с style.display не будет считаться
	ArrayOfActiveChildrenBlocks=[];
	 
	NumberOfBlockForInitialInstallationInCenterOfContainer=0;
	
	//Переменная хранит номер (нумерация уже согласно массиву активных блоков) активного блока; по умолчанию это блок, который изначально должен быть
	//"в центре"
	NumberOfActiveBlock=0;
	
	
	//Переменная для хранения значения критического сдвига - сдвига, при котором происходит анимация к следующему блоку в конетейнере
	CriticalShift=50;
	
	//Переменная показывает, может ли происходить анимация (по условию: true) - анимация может происходить
	AnimationCanHappening=true;
	
	//Переменная показывает, происходит ли в данный момент анимация(изначально понятно, что анимация не происходит)
	AnimationIsHappening=false;
	
	//Переменная хранит сеанс касания экрана пользователем (нужно для реагирования только на скролл вызванный пользователем или анимаций
	//событие скролла вызванное изменением размера окна в таком случае будет игнорироваться)
	TouchIsHappening=false;
	
	//Переменная для записи состояния положения скролла "сейчас"
	NowScrollLeft=0;
	
	//Переменная для записи состояния положения скролла в прошлый раз вызова функции определения характеристик скроллинга
	LastScrollLeft=0;
	
	//Переменная для записи направления последнего скролла от пользователя (изначально это направление отсутствует)
	DirectionOfLastScrollByUser='';

	DurationOfAnimation=300;
	
	//Функция, которая будет запущена, когда скролл достигнет левого края контейнера(придет в начало)
	StartFunctionIfFirstChildrenBlockWasReached=()=>{};
	
	//Функция, которая будет запущена, когда скролл достигнет правого края(придет в конец)
	StartFunctionIfLastChildrenBlockWasReached=()=>{};
	
	//Объявляем конструктор класса 
	constructor(ConfigureObject){//В конструктор класса необходимо передать объект настройки - объект, который содержит все данные
	//необходимые для создания объекта
		
		
		//Устанавливаем значения, полученные из объекта и вычисляемые свойства на их основе:
		
		//На основе переданного в объекте настроки CSS селектора контейнера, получаем ссылку на DOM модель объекта
		this.Container=document.querySelector(ConfigureObject.Container);
		
		//Вычисляем координату середины контейнера
		this.CoordinateOfMiddleOfContainer=Math.round(this.Container.getBoundingClientRect().x+this.Container.getBoundingClientRect().width/2);
		
		//Заполняем массив активных дочерних элементов активными дочерними элементами из контейнера
		this.ArrayOfActiveChildrenBlocks=this.getArrayOfActiveChildrenBlocks();//Заполняем массив активными элементами
		
		//Записываем номер блока, который нужно изначально поставить в центр контейнера
		this.NumberOfBlockForInitialInstallationInCenterOfContainer=ConfigureObject.NumberOfBlockForInitialInstallationInCenterOfContainer
		
		//До объявления функций реагирования на скролл ставим блок в центре контейнера(чтобы они случайно не выполнились делаем это до их
		//регистрации в системе):
		this.SetBlockInCenterOfContainer(this.NumberOfBlockForInitialInstallationInCenterOfContainer);

		//Записываем номер активного блока
		this.NumberOfActiveBlock=this.NumberOfBlockForInitialInstallationInCenterOfContainer;
		
		//Получаем из объекта настроек продолжительность анимации
		this.DurationOfAnimation=ConfigureObject.DurationOfAnimation;
		
		//Получаем из объекта настроек значение критического сдвига
		this.CriticalShift=ConfigureObject.CriticalShift;
		
		//Записываем положение скролла после центрирования дочернего блока в конетейнере 
		this.NowScrollLeft=this.Container.scrollLeft;
		
		//Записываем положение скролла после центрирования дочернего блока в конетейнере 
		this.LastScrollLeft=this.Container.scrollLeft;
		
		//Если переданные функции реагирования на достижения скроллом конечной точки не равны null, то передаем их вместо
		//пустых по умолчанию функций:
		
		if(ConfigureObject.StartFunctionIfFirstChildrenBlockWasReached!=null){
			//Записываем в переменную функцию, которая будет запущена, когда скролл достигнет левого края контейнера(придет в начало)
			this.StartFunctionIfFirstChildrenBlockWasReached=ConfigureObject.StartFunctionIfFirstChildrenBlockWasReached;
		}
		
		if(ConfigureObject.StartFunctionIfFirstChildrenBlockWasReached!=null){
				
			//Записываем в переменную функцию, которая будет запущена, когда скролл достигнет правого края(придет в конец)
			this.StartFunctionIfLastChildrenBlockWasReached=ConfigureObject.StartFunctionIfLastChildrenBlockWasReached;
			
		}
		
		//Устанавливаем слушатели событий:
		
		//Реагирование на изменения размера окна (когда анимация не идет)
		
		window.addEventListener('resize',()=>{
			
			//Если анимация не происходит, то обновляем координату положения середины контейнера
			//и центрируем активный сейчас блок
			if(this.AnimationIsHappening==false){
				
				//При изменении размера окна необходимо обновить координату середины контейнера
				this.CoordinateOfMiddleOfContainer=Math.round(this.Container.getBoundingClientRect().x+this.Container.getBoundingClientRect().width/2);
				
				this.SetBlockInCenterOfContainer(this.NumberOfActiveBlock);
				
			}
			
		});
		
		
		//Реагирование на изменения в DOM (изменение style.display) - перезапись массива активных дочерних элементов:
		
		//Обозреватель/слушатель изменений в DOM, через стрелочную функцию реагируем на изменения аттрибутов в 
		//дочерних элементах Container
		let Observer=[];

		Observer[0]=new MutationObserver((mutationRecords)=>{
			
			this.ArrayOfActiveChildrenBlocks=this.getArrayOfActiveChildrenBlocks();
			console.log(this.ArrayOfActiveChildrenBlocks);
			
		});
			
		Observer[1]=new MutationObserver((mutationRecords)=>{
			
			this.ArrayOfActiveChildrenBlocks=this.getArrayOfActiveChildrenBlocks();
			console.log(this.ArrayOfActiveChildrenBlocks);
			
		});	

		//Записываем, какие изменения нужно прослушивать и на каких блоках
		Observer[0].observe(this.Container.children[0],{

			attributes:true// указываем, что прослушиваем изменения в атрибутах

		});

		Observer[1].observe(this.Container.children[2],{

			attributes:true// указываем, что прослушиваем изменения в атрибутах
		});
		
		
		//Запись параметров для их поддержания в актуальном состоянии
		this.Container.addEventListener('scroll',()=>{
			
			//При событии скролла обновляем параметры скролла
			
			this.LastScrollLeft=this.NowScrollLeft;////Записываем прошлый Container.ScrollLeft (который до события scroll был нынешним)
			
			this.NowScrollLeft=this.Container.scrollLeft;//Записываем нынешний Container.ScrollLeft в переменную NowScrollLeft
			
			if(this.NowScrollLeft-this.LastScrollLeft>0){
			
				this.DirectionOfLastScrollByUser='Right';
			
			}else if(this.NowScrollLeft-this.LastScrollLeft<0){
				
				this.DirectionOfLastScrollByUser='Left';	
					
			}
			
			//Выводим данные для видимости
			//Status.innerHTML='Состояние: пользователь проскроллил '+DirectionOfLastScrollByUser;
			
			this.WriteInformaionAboutScroll();//Выводим данные о положении блоков
			
			
			if(this.AnimationCanHappening==false){//Если AnimationCanHappening, это значит, что это пользователь прокручивает скролл, а не анимация
				//Потом убрать
				ScrollDirection.innerHTML='Направление движения скролла пользователем:'+this.DirectionOfLastScrollByUser;
				
			}
			
			//Реагирование на события достижения скролла концов будет вызываться, если либо человек скроллит
			//Либо скролл двигается за счет анимации (которая в конце может происходить), если скролл происходит из-за изменения размеров окна
			//то реагирвоание на достижения конца не будет происходить
			
			if(this.TouchIsHappening==true && this.AnimationIsHappening==false){
				
				//Если середина нулевого блока и середина контейнера имеют одинаковое местоположение, то разность их координат равна нулю, тогда 
				//Container.scrollLeft равен 0, то есть скролл находится в самом начале
				if(Math.trunc(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(0))==0){
								
					this.StartFunctionIfFirstChildrenBlockWasReached();
				
				//Если середина последнего блока (он равен сумме всех активных блоков минус единица) и середина контейнера 
				//имеют одинаковое местоположение, то разность их координат равна нулю, тогда //Container.scrollLeft равен 0, 
				//то есть скролл находится в самом начале
				}else if(Math.trunc(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(this.getArrayOfActiveChildrenBlocks().length-1))==0){
					
					this.StartFunctionIfLastChildrenBlockWasReached();
								
				}
				
			}
				
		});
		
		
		
		
		
		this.Container.addEventListener('touchstart', ()=>{
			
			//Если пользоатель начал касание к экрану, Отключаем анимацию движения,
			//Если она была включена: присваиваем переменной, которая показывает, может ли происходить анимация или нет, false
			//К этой переменной постоянно обращается функция анимации, поэтому как только эта переменная стала равна false, функция отключается
			this.AnimationCanHappening=false; 
			//Так же присваиваем переменной, которая показывает, протекает анимация или нет, значение false
			this.AnimationIsHappening=false;
			
			//Показываем, что пользователь начал касаться экрана
			this.TouchIsHappening=true;
			
		});
		
		
		
		//Если пользователь заканчивает касание, то включаем анимацию движения,
		//если выполняются соответствующие условия(вызов функции анимации движения)
		this.Container.addEventListener('touchend',()=>{
			
			//Показываем, что пользователь закончил касаться экрана
			this.TouchIsHappening=false;
			
			this.AnimationCanHappening=true;//После конца прикосновения анимация может идти: записываем в переменную, 
			//к которой постоянно обращается функция анимации, что анимация "разрешена"
			
			this.NumberOfActiveBlock=this.getNumberOfActiveBlock();//Получаем номер "активного" блока
			
			//-----------------------------------------------------------------------------------------------------------------------------------
			//Определяем будет ли активный блок двигаться к своему устойчивому положению (или оставаться на месте) или будет сменяться на другой блок:
			
			
			//Если сдвиг меньше критического, то активный блок будет переходить к устойчивому состоянию
			
			if(Math.abs(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(this.NumberOfActiveBlock))<this.CriticalShift){
				
				//Определяем направление скролла активного блока(куда будет двигаться активный блок, направляясь к своему устойчивому положению-
				//центр активного блока должен стать) к своему устойчивому состоянию
				
				//Имеем разность координаты середины дочернего элемента и середины контейнера 
				//Если полученная разность больше нуля, то дочерний блок сдвинут вправо и его нужно двигать влево, то есть скролл должен идти вправо
				//значит изменение положения скролла за итерацию должно быть положительным
				
				if(Math.trunc(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(this.NumberOfActiveBlock))>0){
						
						
						this.StartAnimation(this.NumberOfActiveBlock,'Right');//Начинаем анимацию
						
						this.WriteInformaionAboutScroll();//Выводим данные
						
						//console.log('Скролл вправо к состоянию покоя');
						
						
						
				//Если полученная разность меньше нуля, то дочерний блок сдвинут влево и его нужно двигать вправо, то есть скролл должен идти влево
				//значит изменение положения скролла за итерацию должно быть отрицательным
				
				}else if(Math.trunc(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(this.NumberOfActiveBlock))<0){
						
						//alert('Команда запуска анимации');
						
						this.StartAnimation(this.NumberOfActiveBlock,'Left');//Начинаем анимацию
						
						this.WriteInformaionAboutScroll();//Выводим данные
						
						//console.log('Скролл влево к состоянию покоя');
						
				}		
				
			}
			
			
			//Если сдвиг больше критического, то происходит переход к следующему блоку
			if(Math.abs(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(this.NumberOfActiveBlock))>=this.CriticalShift){
				
				let NumberOfNextBlock=0;
				
				
				//Если пользователь крутит скролл влево, то
				if(this.DirectionOfLastScrollByUser=='Left'){
					
					//Если разница между серединой контейнера и активного блока больше нуля, то левая граница экрана не достигла середины следующего блока
					//то есть мы должны использовать номер следующего блока, чтобы скролл двигался до его середины
					
					if(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(this.NumberOfActiveBlock)>0){
							
						NumberOfNextBlock=this.NumberOfActiveBlock-1;
									
					}
					
					//Если разница между серединой контейнера и активного блока меньше нуля, то активен следующий (левый) блок, 
					//поэтому можно использовать уже его номер чтобы скролл двигался до него
					if(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(this.NumberOfActiveBlock)<0){
						
						NumberOfNextBlock=this.NumberOfActiveBlock;		
						
					}
					
					
					//Если выбранный номер блока больше или равен нулю, то запускаем анимацию (защита от ошибок при движении влево; 
					//возможная ошибка: использования номера элемента, номер которого больше, чем есть в контейнере)
					if(NumberOfNextBlock>=0){
						
						this.StartAnimation(NumberOfNextBlock,'Left');//Начинаем анимацию
						
					}
					
					//console.log('Скролл влево к следующему блоку');
					
					this.WriteInformaionAboutScroll();//Выводим данные
					
				} 
				
				
				
				//Если пользователь крутит скролл вправо, то
				if(this.DirectionOfLastScrollByUser=='Right'){
					//Если разница между серединой контейнера и активного блока меньше нуля, то правая граница экрана не достигла середины следующего блока
					//то есть мы должны использовать номер следующего блока, чтобы скролл двигался до его середины
					if(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(this.NumberOfActiveBlock)<0){
							
						NumberOfNextBlock=this.NumberOfActiveBlock+1;
							
					}
					
					//Если разница между серединой контейнера и активного блока больше нуля, то активен следующий блок, поэтому можно использовать уже 
					//его номер чтобы скролл двигался до него
					if(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(this.NumberOfActiveBlock)>0){
						
						NumberOfNextBlock=this.NumberOfActiveBlock;		
						
					}
					
					//Если выбранный номер блока меньше или равен номеру максимального элемента, то запускаем анимацию 
					//(защита от ошибок при движении вправо; возможная ошибка: использования номера элемента, 
					//номер которого больше, чем есть в контейнере)
					//if(NumberOfNextBlock<=Container.children.length-1){
						
					if(NumberOfNextBlock<=this.ArrayOfActiveChildrenBlocks.length-1){
						
						
						this.StartAnimation(NumberOfNextBlock,'Right');//Начинаем анимацию
						
					}
					
					//console.log('Скролл вправо к следующему блоку');
						
					this.WriteInformaionAboutScroll();//Выводим данные	
								
				} 
							
			}
			

		});
		
  }
  
  
  
   //Объявляем методы класса
	  
	getArrayOfActiveChildrenBlocks(){//Функция для получения массива активных блоков
			
		let ArrayOfActiveChildrenBlocks=[];
			
		let j=0;//Счетчик для массива активных элементов
		
		for(let i=0; i<=this.Container.children.length-1;i++){
					
			if(this.Container.children[i].style.display!='none'){
							
				ArrayOfActiveChildrenBlocks[j]=this.Container.children[i];
				
				j++;//Увеличиваем счетчик массива активных элементов после присваивания, чтобы индексы в массиве оставались в пределах 1,2,3

			}
			
		}
			
		return ArrayOfActiveChildrenBlocks;
		
	}
	  
	
	DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfActiveChildrenBlock){
		
		let DifferenceBetweenCoordinateActiveChildrenBlockAndContainer=Math.round(
		
		//Координата X левого угла переданного дочернего элемента
		this.ArrayOfActiveChildrenBlocks[NumberOfActiveChildrenBlock].getBoundingClientRect().x+
		
		//Половина ширины дочернего элемента - получаем координату середины переданного дочернего элемента 
		this.ArrayOfActiveChildrenBlocks[NumberOfActiveChildrenBlock].getBoundingClientRect().width/2-
		
		//Минус координата середины контейнера
		
		this.CoordinateOfMiddleOfContainer);
		
		return DifferenceBetweenCoordinateActiveChildrenBlockAndContainer;	
		
	}
	
	//Функция, которая ставит переданный активный блок по центру контейнера
  	SetBlockInCenterOfContainer(NumberOfActiveBlockToSetInCenterOfContainer){
		
		//Номер активного блока становится номером, переданным для центрирования
		this.NumberOfActiveBlock=NumberOfActiveBlockToSetInCenterOfContainer;
		
		this.Container.scrollLeft=
		Math.round(
			
			this.Container.scrollLeft
			
			+
			
			this.DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfActiveBlockToSetInCenterOfContainer)
			
		);	
	
	}
	

	WriteInformaionAboutScroll(){
		
		this.NumberOfActiveBlock=this.getNumberOfActiveBlock();
		
		let StringToPrint='';
		
		for(let i=0;i<=this.ArrayOfActiveChildrenBlocks.length-1;i++){
			
			StringToPrint= StringToPrint+' Разность с '+i+'-ым:'+(this.ArrayOfActiveChildrenBlocks[i].getBoundingClientRect().x+
			this.ArrayOfActiveChildrenBlocks[i].getBoundingClientRect().width/2-this.CoordinateOfMiddleOfContainer)+'<br>';
			
		}
		
		StringToPrint=StringToPrint+' <br>Активный блок:'+this.NumberOfActiveBlock;
		
		Status.innerHTML=StringToPrint;
	
	}


	

	getNumberOfActiveBlock(){//Устанавливаем номер активного блока
		
		//Находим номер активного блока - блока, центр которого ближе всех остальных блоков ближе к центру контейнера
		
		//Находим активного ребенка - элемент, середина которого ближе всего к середине конейнера
		 let NumberOfActiveBlock=0;//Номер активного блока (по дефолту берем 0)
		
		//Записываем координаты середины первого дочернего блока:
		//Координата середины прошлого блока ребенка(переменная используется в цикле)
		let CoordinateOfMiddleOfLastChildren=0;//Инициализируем значение по умолчанию
		
		//Координата середины блока ребенка(отрицательные и положительные значения)
		let CoordinateOfMiddleOfChildren=
		
		Math.round(
			
			this.ArrayOfActiveChildrenBlocks[0].getBoundingClientRect().x
			
			+
			
			this.ArrayOfActiveChildrenBlocks[0].getBoundingClientRect().width/2
			
		);
		
		//(далее значение этой переменной уйдет в CoordinateOfMiddleOfLastChildren)
		
		//Данные для 0 (Container.children[0]) блока задаются изначально, далее он сравнивается с другими и находится активный блок
		//Так как данные для 0 становятся известны изначально, то начинаем цикл с 1 (Container.children[1])
		for(let i=1; i<=this.ArrayOfActiveChildrenBlocks.length-1;i++){	
			
			CoordinateOfMiddleOfLastChildren=CoordinateOfMiddleOfChildren;//Записывем координаты середины ранее итерируемого блока
			
			CoordinateOfMiddleOfChildren=this.ArrayOfActiveChildrenBlocks[i].getBoundingClientRect().x+this.ArrayOfActiveChildrenBlocks[i].getBoundingClientRect().width/2;
				
			//Получаем координаты середины ныне интерируемого блока
			//Если разность координат середины контейнера и нынешнего ребенка больше, чем разность координат прошлого ребенка и конейнера, то нынешний ребенок
			//на этом этапе принимается за активный блок (в конце блока будет найден истинно активный блок, разность чьих координат середины и середины конейтенара
			//наименьшая среди всех дочерних блоков)
			
			if(
				
				Math.abs(CoordinateOfMiddleOfChildren-this.CoordinateOfMiddleOfContainer)
				
				<=
				
				Math.abs(CoordinateOfMiddleOfLastChildren-this.CoordinateOfMiddleOfContainer)
				
			){
				
				NumberOfActiveBlock=i;
						
			}		
				
		}
		
		return NumberOfActiveBlock;
		
	}
	
	






	//DurationOfAnimation время любой анимации - константа, оно задается изначально 
	//Это значит, что если перемещение блоков должно быть большим, то его скорость будет большой, 
	//Если перемещение блоков минимальное - то скорость анимации будет меньше

	//Метод запуска анимации

	TimeOfStart=0;
	TimeOfEnd=0;
	
	StartAnimation(NumberOfChildrenBlock,ScrollDirection){
		
		//Модуль изменения Container.scrollLeft за одну итерацию
		let ModuleChangeScrollLeftPerIteration=1;
		
		//Изменение Container.scrollLeft за одну итерацию
		let ChangeScrollLeftPerIteration=0;
		
		//Задержка между интерациями (минимальная задержка около 10 миллисекунд)
		let DelayBetweenIterations=10;
		
		this.TimeOfStart=new Date().getTime();//Время начала анимации
		
		
		//Получаем интервал между первым и вторым активными блоками(нулевым и первым):
		let IntervalBetweenBlocks=
		Math.round(this.ArrayOfActiveChildrenBlocks[1].getBoundingClientRect().x-
		this.ArrayOfActiveChildrenBlocks[0].getBoundingClientRect().x)
		
		//Получаем количество пикселей, которые должны скроллиться за одну миллисекунду
		let SpeedOfScroll=IntervalBetweenBlocks/this.DurationOfAnimation;
		
		if(Math.abs(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock))>this.CriticalShift){
			
			//Получаем шаг итерации (количество пикселей, которые должны скроллится за время итерации - 10 миллисекунд)
			ModuleChangeScrollLeftPerIteration=Math.round(SpeedOfScroll*10);
			
		}else{
			
			//Получаем шаг итерации (количество пикселей, которые должны скроллится за время итерации - 10 миллисекунд)
			ModuleChangeScrollLeftPerIteration=Math.round(SpeedOfScroll*2);
			
		}
		
		//Настраиваем знак шага в зависимости от переданного параметра направления движения:
		
		//скролл должен идти вправо значит изменение положения скролла за итерацию должно быть положительным
		
		if(ScrollDirection=='Right'){
			
			ChangeScrollLeftPerIteration=ModuleChangeScrollLeftPerIteration;	
			
		//скролл должен идти влево значит изменение положения скролла за итерацию должно быть отрицательным
		}else if(ScrollDirection=='Left'){
			
			ChangeScrollLeftPerIteration=ModuleChangeScrollLeftPerIteration*(-1);	
			
		}
		
		
		//Записываем, что анимация начала происходить
		this.AnimationIsHappening=true;
		
		
		//Функция StartAnimation запускается только если сдвиг отличен от нуля (его целая часть), поэтому для выхода из функции надо 
		//только проверять расположение скролла
		
		//Записываем сколько пикселей надо проскролить 
		let AmountOfPixelsToScroll=this.DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock);
		
		//Стартовая позиция скролла
		let StartPositionOfScroll=this.Container.scrollLeft;
		
		//Нынешняя (итерируемая) позиция скролла
		let NowScrollPosition=this.Container.scrollLeft;
		
		
		//Конечная позиция скролла
		let EndPositionOfScroll=this.Container.scrollLeft+AmountOfPixelsToScroll;
		
		
		
		//Функция проигрывания анимации
		let RunAnimation=()=>{
			
			
			/*
			
			if(
				
				//Условие для продолжения анимации разность координат центров переданного блока и контейнера должна быть отлична от нуля 
				this.DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock)!=0
				&& this.AnimationCanHappening==true//И анимация не была остановлена пользователем (анимация может происходить)
				
			){
				
				
			*/
				
				
				
				
				if(
					
					//Если разность разности между серединой переданного дочернего блока и серединой контейнера и шагом больше нуля, то
					//продолжаем движение и изменяем Container.scrollLeft на этот шаг
					
					/*
					(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock)-ChangeScrollLeftPerIteration)>0
					&&
					ScrollDirection=='Right'
					
					||
					
					(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock)-ChangeScrollLeftPerIteration)<0
					&&
					ScrollDirection=='Left'
					*/
						
					//Если нынешняя позиция плюс положительное изменение будет меньше конечной позиции(а она больше начальной),
					//то мы можем увеличивать нынешню позицию на это положительное изменение иначе, чтобы не 
					//скролл не превзошел своего крайнего положения сразу присваеиваем нынешнему положению конечное				
					ScrollDirection=='Right'&& NowScrollPosition+ChangeScrollLeftPerIteration<EndPositionOfScroll
						
					||
					
					//Если нынешняя позиция плюс отрицительное смещение будет больше, чем конечная позиция (а она меньше начальной),
					//то мы можем прибавлять отрицательное смещение иначе, чтобы скролл не стал меньше своего крайнего положения,
					//то сразу присваиваем нынешнему положению конечное
					ScrollDirection=='Left'&& NowScrollPosition+ChangeScrollLeftPerIteration>EndPositionOfScroll
					
				){
					
					//Работаем с виртуальным скроллом (улучшение производительности за счет отсутствия обращения к DOM 
					//при проверке положения скролла)
					//Изменяем виртуальную модель DOM
					NowScrollPosition=NowScrollPosition+ChangeScrollLeftPerIteration;
					
					
					//Изменяем реальный скролл (реальную DOM)
					this.Container.scrollLeft=this.Container.scrollLeft+ChangeScrollLeftPerIteration;//Изменяем  свойство scrollLeft на заранее определенную величну
					//Условие выполнилось, поэтому снова запускаем функцию
					setTimeout(RunAnimation, DelayBetweenIterations);//Запускаем функцию еще раз, так как после изменения Container.scrollLeft разность координат середин контейнера и 
					//переданного дочернего блока не станет равной нулю
				
				}else{
					
					this.Container.scrollLeft=EndPositionOfScroll;
					
					//Если условие было равно false, значит, почти было достигнуто устойчивое положение скролла
					//далее строкой выше скролл приобрел устойчивое положение, значит, анимация закончилась, поэтмоу
					//Записываем, что анимация прекратилась, так как скролл достиг требуемого положения
					this.AnimationIsHappening=false;
					
					//Если середина нулевого блока и середина контейнера имеют одинаковое местоположение, то разность их координат равна нулю, тогда 
					//Container.scrollLeft равен 0, то есть скролл находится в самом начале
					if(Math.trunc(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(0))==0){
									
						this.StartFunctionIfFirstChildrenBlockWasReached();
					

					//Если середина последнего блока (он равен сумме всех активных блоков минус единица) и середина контейнера 
					//имеют одинаковое местоположение, то разность их координат равна нулю, тогда //Container.scrollLeft равен 0, 
					//то есть скролл находится в самом начале
					}else if(Math.trunc(this.DifferenceBetweenCoordinateChildrenBlockAndContainer(this.ArrayOfActiveChildrenBlocks.length-1))==0){
						
						this.StartFunctionIfLastChildrenBlockWasReached();
									
					}
					
					
					this.TimeOfEnd=new Date().getTime();//Время конца анимации
					
					console.log("время анимации:"+(this.TimeOfEnd-this.TimeOfStart));//Вывод времени анимации
					
				}
				
				
				
				this.WriteInformaionAboutScroll();//Печатаем информацию
				
			/*	
				
				
			}else{
				//Если функция была запущена еще раз, но условие на продолжение анимации не было true, то изменяем переменную, которая показывает,
				//протекает анимация или нет
				//Записываем, что анимация прекратилась, так как скролл достиг требуемого положения
				this.AnimationIsHappening=false;
				
			}
			
			*/
			
			
		}
		
		
		//Немедленно запускаем функцию анимации
		RunAnimation();
		
		
	}
	
}



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



















































/*



//Разрабатывается ScrollSap на мобильные устройства

let CriticalShift=50;//Критический сдвиг дочернего блока, после которого он будет заменяться анимацией на другой блок

Container=document.querySelector('#Container');//Ссылка на контейнер


//Координаты середины контейнера
let CoordinateOfMiddleOfContainer=Container.getBoundingClientRect().x+Container.getBoundingClientRect().width/2;


let DurationOfAnimation=300;//Продолжительность полной анимации в секундах (при смене одного блока на другой)


let AnimationCanHappening=true;//Переменная показывает, может ли происходить анимация

/*
//Отключаем анимацию движения, если она была включена: присваиваем переменной, которая показывает, может ли происходить анимация или нет, false
//К этой переменной постоянно обращается функция анимации, поэтому как только эта переменная стала равна false, функция отключается
Container.addEventListener('touchstart', ()=>{AnimationCanHappening=false;});
*/

/*
let NowScrollLeft=Container.scrollLeft;//Переменная для записи состояния положения скролла "сейчас"
let LastScrollLeft=Container.scrollLeft;//Переменная для записи состояния положения скролла в прошлый раз вызова функции определения характеристик
//скроллинга

let DirectionOfLastScrollByUser='';//Переменная для записи направления последнего скролла от пользователя



//Функция, котороя будет выполняться, когда скролл достиг первого блока (запускается в конце анимации)
function FunctionIfFirstChildrenBlockWasReached(){
	
	console.log('был достигнут первый блок, положение скролла:'+Container.scrollLeft);
	
}


//Функция, котороя будет выполняться, когда скролл достиг последнего блока (запускается в конце анимации)
function FunctionIfLastChildrenBlockWasReached(){
	
	console.log('был достигнут последний блок, положение скролла:'+Container.scrollLeft);
	
}



//При создании объекта ScrollSnap получаем массив из ссылок на активные блоки
let ArrayOfActiveChildrenBlocks=getArrayOfActiveChildrenBlocks();
//Постоянно обновляющийся при изменениях в DOM массив дочерних элементов, у которых display не будет равен none:

function getArrayOfActiveChildrenBlocks(){
	
	let ArrayOfActiveChildrenBlocks=[];
	
		j=0;//Счетчик для массива активных элементов
		for(let i=0; i<=Container.children.length-1;i++){
		
		if(Container.children[i].style.display!='none'){
			
			ArrayOfActiveChildrenBlocks[j]=Container.children[i];
			j++;//Увеличиваем счетчик массива активных элементов после присваивания, чтобы индексы в массиве оставались в пределах 1,2,3
		}
		
	}
	
	return ArrayOfActiveChildrenBlocks;
}







































/*



//Обозреватель/слушатель изменений в DOM, через стрелочную функцию реагируем на изменения аттрибутов в 
//дочерних элементах Container
let Observer=[];

Observer[0]=new MutationObserver((mutationRecords)=>{
	
	ArrayOfActiveChildrenBlocks=getArrayOfActiveChildrenBlocks();
	console.log(ArrayOfActiveChildrenBlocks);
	
});
	
Observer[1]=new MutationObserver((mutationRecords)=>{
	
	ArrayOfActiveChildrenBlocks=getArrayOfActiveChildrenBlocks();
	console.log(ArrayOfActiveChildrenBlocks);
	
});	

//Записываем, какие изменения нужно прослушивать и на каких блоках
Observer[0].observe(Container.children[0],{

	attributes:true// в атрибутах node,

});

Observer[1].observe(Container.children[2],{

	attributes:true// в атрибутах node,

});



setTimeout(()=>{
	
	//Container.children[0].style.display='none';
	
//console.log('дочерний элемент убран');



},2000);


*/















/*




//Номер блока для центрирования
let NumberOfActiveBlockToSetInCenterOfContainer=0;

//Container.scrollLeft=400;//На время разработки устанавливаем стандартное значение положения скролла в контейнере - середина контейнера

//Автоматически ставим скролл в контейнере во время вызова конструктора, чтобы координата центра блока, номер которого передали, 
//совпадала с координатой середины контейнера

function SetBlockInCenterOfContainer(NumberOfActiveBlockToSetInCenterOfContainer){
	
Container.scrollLeft=DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfActiveBlockToSetInCenterOfContainer);	
	
}









//SetBlockInCenterOfContainer(NumberOfActiveBlockToSetInCenterOfContainer);

















//Номер активного блока - блока, центр которого ближе всего к центру контейнера
//Изначально номер активного блока равняется номеру блока, который нужен для постановки в центр контейнера
let NumberOfActiveBlock=NumberOfActiveBlockToSetInCenterOfContainer;


/*

//Запись параметров для их поддержания в актуальном состоянии
Container.addEventListener('scroll',()=>{
	
	//При событии скролла обновляем параметры скролла
	
	LastScrollLeft=NowScrollLeft;////Записываем прошлый Container.ScrollLeft (который до события scroll был нынешним)
	
	NowScrollLeft=Container.scrollLeft;//Записываем нынешний Container.ScrollLeft в переменную NowScrollLeft
	
	if(NowScrollLeft-LastScrollLeft>0){
	
		DirectionOfLastScrollByUser='Right';
	
	}else if(NowScrollLeft-LastScrollLeft<0){
		
		DirectionOfLastScrollByUser='Left';	
			
	}
	
	//Выводим данные для видимости
	//Status.innerHTML='Состояние: пользователь проскроллил '+DirectionOfLastScrollByUser;
	
	WriteInformaionAboutScroll();//Выводим данные о положении блоков
	
	
	if(AnimationCanHappening==false){
		
		ScrollDirection.innerHTML='Направление движения скролла пользователем:'+DirectionOfLastScrollByUser;
		
	}
	
	//Если середина нулевого блока и середина контейнера имеют одинаковое местоположение, то разность их координат равна нулю, тогда 
	//Container.scrollLeft равен 0, то есть скролл находится в самом начале
	if(DifferenceBetweenCoordinateChildrenBlockAndContainer(0)==0){
					
		FunctionIfFirstChildrenBlockWasReached();
					
	}


	//Если середина последнего блока (он равен сумме всех активных блоков минус единица) и середина контейнера 
	//имеют одинаковое местоположение, то разность их координат равна нулю, тогда //Container.scrollLeft равен 0, 
	//то есть скролл находится в самом начале
	if(DifferenceBetweenCoordinateChildrenBlockAndContainer(getArrayOfActiveChildrenBlocks().length-1)==0){
		
		FunctionIfLastChildrenBlockWasReached();
					
	}
	
});


*/






/*







//Функция получения номера активного блока: тот блок, центр которого ближе всего к центру контейнера будет выбран активным



function WriteInformaionAboutScroll(){
	
	SetNumberOfActiveBlock();
	
	StringToPrint='';
	
	for(let i=0;i<=ArrayOfActiveChildrenBlocks.length-1;i++){
		
		StringToPrint= StringToPrint+' Разность с '+i+'-ым:'+(ArrayOfActiveChildrenBlocks[i].getBoundingClientRect().x+
		ArrayOfActiveChildrenBlocks[i].getBoundingClientRect().width/2-CoordinateOfMiddleOfContainer)+'<br>';
		
		//' Разность с Нулевым:'+(Container.children[0].getBoundingClientRect().x+Container.children[0].getBoundingClientRect().width/2-CoordinateOfMiddleOfContainer)+
	//' <br>Разность с Первым:'+(Container.children[1].getBoundingClientRect().x+Container.children[1].getBoundingClientRect().width/2-CoordinateOfMiddleOfContainer)+
	//' <br>Разность с Вторым:'+(Container.children[2].getBoundingClientRect().x+Container.children[2].getBoundingClientRect().width/2-CoordinateOfMiddleOfContainer)+
		
		
	}
	
	StringToPrint=StringToPrint+' <br>Активный блок:'+NumberOfActiveBlock;
	
	
	/*
	Status.innerHTML=
	' Модуль Разности с Нулевым:'+Math.abs(Container.children[0].getBoundingClientRect().x+Container.children[0].getBoundingClientRect().width/2-CoordinateOfMiddleOfContainer)+
	' <br>Модуль Разности с Первым:'+Math.abs(Container.children[1].getBoundingClientRect().x+Container.children[1].getBoundingClientRect().width/2-CoordinateOfMiddleOfContainer)+
	' <br>Модуль Разности с Вторым:'+Math.abs(Container.children[2].getBoundingClientRect().x+Container.children[2].getBoundingClientRect().width/2-CoordinateOfMiddleOfContainer)+
	' <br>Активный блок:'+NumberOfActiveBlock;
	*/
	/*
	
	Status.innerHTML=StringToPrint;
	
	
	//Status.innerHTML=StringToPrint;
	//' Разность с Нулевым:'+(Container.children[0].getBoundingClientRect().x+Container.children[0].getBoundingClientRect().width/2-CoordinateOfMiddleOfContainer)+
	//' <br>Разность с Первым:'+(Container.children[1].getBoundingClientRect().x+Container.children[1].getBoundingClientRect().width/2-CoordinateOfMiddleOfContainer)+
	//' <br>Разность с Вторым:'+(Container.children[2].getBoundingClientRect().x+Container.children[2].getBoundingClientRect().width/2-CoordinateOfMiddleOfContainer)+
	//' <br>Активный блок:'+NumberOfActiveBlock;
	
}







function SetNumberOfActiveBlock(){//Устанавливаем номер активного блока
	
	//Находим номер активного блока - блока, центр которого ближе всех остальных блоков ближе к центру контейнера
	
	//Находим координату середины контейнера:
	
	
	//Находим активного ребенка - элемент, середина которого ближе всего к середине конейнера
	 NumberOfActiveBlock=0;//Номер активного блока
	
	//Записываем координаты середины первого дочернего блока:
	//Координата середины блока ребенка(отрицательные и положительные значения)
	let CoordinateOfMiddleOfLastChildren=0;//Инициализируем значение по умолчанию


/*

	//Координата середины блока ребенка(отрицательные и положительные значения)
	let CoordinateOfMiddleOfChildren=Container.children[0].getBoundingClientRect().x+Container.children[0].getBoundingClientRect().width/2;
	
	//(далее значение этой переменной уйдет в CoordinateOfMiddleOfLastChildren)
	
	
	//Данные для 1 (Container.children[0]) блока задаются изначально, далее он сравнивается с другими и находится активный блок
	for(let i=1; i<Container.children.length;i++){	
		
		CoordinateOfMiddleOfLastChildren=CoordinateOfMiddleOfChildren;//Записывем координаты середины ранее итерируемого блока
		
		CoordinateOfMiddleOfChildren=Container.children[i].getBoundingClientRect().x+Container.children[i].getBoundingClientRect().width/2;
			
		//Получаем координаты середины ныне интерируемого блока
		//Если разность координат середины контейнера и нынешнего ребенка больше, чем разность координат прошлого ребенка и конейнера, то нынешний ребенок
		//на этом этапе принимается за активный блок (в конце блока будет найден истинно активный блок, разность чьих координат середины и середины конейтенара
		//наименьшая среди всех дочерних блоков)
		
		if(
			
			Math.abs(CoordinateOfMiddleOfChildren-CoordinateOfMiddleOfContainer)
			
			<=
			
			Math.abs(CoordinateOfMiddleOfLastChildren-CoordinateOfMiddleOfContainer)
			
		){
			
			NumberOfActiveBlock=i;
			
				
		}
		
		
	*/	
	
	/*
	//Координата середины блока ребенка(отрицательные и положительные значения)
	let CoordinateOfMiddleOfChildren=ArrayOfActiveChildrenBlocks[0].getBoundingClientRect().x+ArrayOfActiveChildrenBlocks[0].getBoundingClientRect().width/2;
	
		
	//(далее значение этой переменной уйдет в CoordinateOfMiddleOfLastChildren)
	
	
	//Данные для 1 (Container.children[0]) блока задаются изначально, далее он сравнивается с другими и находится активный блок
	for(let i=1; i<=ArrayOfActiveChildrenBlocks.length-1;i++){	
		
		CoordinateOfMiddleOfLastChildren=CoordinateOfMiddleOfChildren;//Записывем координаты середины ранее итерируемого блока
		
		CoordinateOfMiddleOfChildren=ArrayOfActiveChildrenBlocks[i].getBoundingClientRect().x+ArrayOfActiveChildrenBlocks[i].getBoundingClientRect().width/2;
			
		//Получаем координаты середины ныне интерируемого блока
		//Если разность координат середины контейнера и нынешнего ребенка больше, чем разность координат прошлого ребенка и конейнера, то нынешний ребенок
		//на этом этапе принимается за активный блок (в конце блока будет найден истинно активный блок, разность чьих координат середины и середины конейтенара
		//наименьшая среди всех дочерних блоков)
		
		if(
			
			Math.abs(CoordinateOfMiddleOfChildren-CoordinateOfMiddleOfContainer)
			
			<=
			
			Math.abs(CoordinateOfMiddleOfLastChildren-CoordinateOfMiddleOfContainer)
			
		){
			
			NumberOfActiveBlock=i;
			
				
		}		
			
	}
	
}





function DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfActiveChildrenBlock){
	
	/*
	
	let DifferenceBetweenCoordinateChildrenBlockAndContainer=
	
	//Координата X левого угла переданного дочернего элемента
	Container.children[NumberOfChildrenBlock].getBoundingClientRect().x+
	
	//Половина ширины дочернего элемента - получаем координату середины переданного дочернего элемента 
	Container.children[NumberOfChildrenBlock].getBoundingClientRect().width/2-
	
	//Минус координата середины контейнера
	
	CoordinateOfMiddleOfContainer;
	
	return DifferenceBetweenCoordinateChildrenBlockAndContainer;
	*/
	
	/*
	let DifferenceBetweenCoordinateActiveChildrenBlockAndContainer=
	
	//Координата X левого угла переданного дочернего элемента
	ArrayOfActiveChildrenBlocks[NumberOfActiveChildrenBlock].getBoundingClientRect().x+
	
	//Половина ширины дочернего элемента - получаем координату середины переданного дочернего элемента 
	ArrayOfActiveChildrenBlocks[NumberOfActiveChildrenBlock].getBoundingClientRect().width/2-
	
	//Минус координата середины контейнера
	
	CoordinateOfMiddleOfContainer;
	
	return DifferenceBetweenCoordinateActiveChildrenBlockAndContainer;	
	
}








/*


//Включаем анимацию движения,если выполняются соответствующие условия(вызов функции анимации движения)
Container.addEventListener('touchend',()=>{
	
	AnimationCanHappening=true;//После конца прикосновения анимация может идти: записываем в переменную, к которой постоянно обращается
	//функция анимации, что анимация "разрешена"
	
	SetNumberOfActiveBlock();//Получаем номер "активного" блока
	
	//-----------------------------------------------------------------------------------------------------------------------------------
	//Определяем будет ли активный блок двигаться к своему устойчивому положению (или оставаться на месте) или будет сменяться на другой блок:
	
	
		
	//Если сдвиг меньше критического, то активный блок будет переходить к устойчивому состоянию
	
	if(Math.abs(DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfActiveBlock))<CriticalShift){
		
		//Определяем направление скролла активного блока(куда будет двигаться активный блок, направляясь к своему устойчивому положению-
		//центр активного блока должен стать) к своему устойчивому состоянию
		
		//Имеем разность координаты середины дочернего элемента и середины контейнера 
		//Если полученная разность больше нуля, то дочерний блок сдвинут вправо и его нужно двигать влево, то есть скролл должен идти вправо
		//значит изменение положения скролла за итерацию должно быть положительным
		
		if(DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfActiveBlock)>0){
				
				StartAnimation(NumberOfActiveBlock,'Right');//Начинаем анимацию
				
				WriteInformaionAboutScroll();//Выводим данные
				
				//console.log('Скролл вправо к состоянию покоя');
		
		//Если полученная разность меньше нуля, то дочерний блок сдвинут влево и его нужно двигать вправо, то есть скролл должен идти влево
		//значит изменение положения скролла за итерацию должно быть отрицательным
		
		}else if(DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfActiveBlock)<0){
				
				StartAnimation(NumberOfActiveBlock,'Left');//Начинаем анимацию
				
				WriteInformaionAboutScroll();//Выводим данные
				
				//console.log('Скролл влево к состоянию покоя');
				
		}		
		
	}
	
	
	
	//Если сдвиг больше критического, то происходит переход к следующему блоку
	if(Math.abs(DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfActiveBlock))>=CriticalShift){
		
		let NumberOfNextBlock=0;
		
		
		//Если пользователь крутит скролл влево, то
		if(DirectionOfLastScrollByUser=='Left'){
			
			//Если разница между серединой контейнера и активного блока больше нуля, то левая граница экрана не достигла середины следующего блока
			//то есть мы должны использовать номер следующего блока, чтобы скролл двигался до его середины
			
			if(DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfActiveBlock)>0){
					
				NumberOfNextBlock=NumberOfActiveBlock-1;
							
			}
			
			//Если разница между серединой контейнера и активного блока меньше нуля, то активен следующий (левый) блок, 
			//поэтому можно использовать уже его номер чтобы скролл двигался до него
			if(DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfActiveBlock)<0){
				
				NumberOfNextBlock=NumberOfActiveBlock;		
				
			}
			
			
			
			//Если выбранный номер блока больше или равен нулю, то запускаем анимацию (защита от ошибок при движении влево; 
			//возможная ошибка: использования номера элемента, номер которого больше, чем есть в контейнере)
			if(NumberOfNextBlock>=0){
				
				StartAnimation(NumberOfNextBlock,'Left');//Начинаем анимацию
				
			}
			
			//console.log('Скролл влево к следующему блоку');
			
			WriteInformaionAboutScroll();//Выводим данные
			
		} 
		
		
		
		//Если пользователь крутит скролл вправо, то
		if(DirectionOfLastScrollByUser=='Right'){
			//Если разница между серединой контейнера и активного блока меньше нуля, то правая граница экрана не достигла середины следующего блока
			//то есть мы должны использовать номер следующего блока, чтобы скролл двигался до его середины
			if(DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfActiveBlock)<0){
					
				NumberOfNextBlock=NumberOfActiveBlock+1;
					
			}
			
			//Если разница между серединой контейнера и активного блока больше нуля, то активен следующий блок, поэтому можно использовать уже 
			//его номер чтобы скролл двигался до него
			if(DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfActiveBlock)>0){
				
				NumberOfNextBlock=NumberOfActiveBlock;		
				
			}
			
			//Если выбранный номер блока меньше или равен номеру максимального элемента, то запускаем анимацию 
			//(защита от ошибок при движении вправо; возможная ошибка: использования номера элемента, 
			//номер которого больше, чем есть в контейнере)
			//if(NumberOfNextBlock<=Container.children.length-1){
				
			if(NumberOfNextBlock<=ArrayOfActiveChildrenBlocks.length-1){
				
				
				StartAnimation(NumberOfNextBlock,'Right');//Начинаем анимацию
				
			}
			
			//console.log('Скролл вправо к следующему блоку');
				
			WriteInformaionAboutScroll();//Выводим данные	
						
		} 
					
	}

});




*/





/*

//DurationOfAnimation время любой анимации - константа, оно задается изначально 
//Это значит, что если перемещение блоков должно быть большим, то его скорость будет большой, 
//Если перемещение блоков минимальное - то скорость анимации будет меньше

//Метод запуска анимации

let TimeOfStart;
let TimeOfEnd;


function StartAnimation(NumberOfChildrenBlock,ScrollDirection){
	
	//Модуль изменения Container.scrollLeft за одну итерацию
	let ModuleChangeScrollLeftPerIteration=1;
	//Изменение Container.scrollLeft за одну итерацию
	let ChangeScrollLeftPerIteration=0;
	let DelayBetweenIterations=10;//Задержка между интерациями (минимальная задержка около 10 миллисекунд)
	
	TimeOfStart=new Date().getTime();//Время начала анимации
	
	
	//Определяем модуль шага анимации, чтобы он был таким, чтобы анимация проигрывалась приблизительно указанное выше время:
	
	//Общее время анимации делится на количество пикселей, на которое должно переместиться тело - находится время(в миллисекундах),
	//за которое должно быть перемещение на один пиксель
	//Минимальное время задержки - 10 миллисекунд
	
	//console.log(Math.abs(DurationOfAnimation/DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock)));
	
	
	//Если полное время анимации, деленное на расстояние между центрами дочернего блока и контейнера больше десяти (значит, расстояние достаточно
	//маленькое, поэтому анимация будет происходить по одному пикселю и длительность шага будет равна полученному времени одного шаг(общее
	//время, деленное на количество пикселей, будучи больше десяти будет дробью, которая показывает, за сколько будет двигаться один пиксель
	//при умножении этого числа на количество пикселей будет получено общее время анимации (дробь, умноженная на знаменатель, равна числителю)))
	if(Math.abs(DurationOfAnimation/DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock))>10){
		
		ModuleChangeScrollLeftPerIteration=1;
		//Без округления получаются более точные цифры
		DelayBetweenIterations=Math.abs(DurationOfAnimation/DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock));
	


	//Если полное время анимации, деленное на расстояние между центрами дочернего блока и контейнера меньше десяти (значит, расстояние достаточно
	//большое, поэтому если анимация будет происходить по одному пикселю, то длительность шага будет меньше минимальной - 10 миллисекунд),поэтому:

	//Если время одного шага будет меньше 10 миллисекунд, то принимаем время одного шага за 10 миллисекунд(минимальное время итерации)
	//и получаем количество пикселей за один сдвиг: общее количество пикселей делим на количество шагов анимации - частное от деления общего
	//времени анимации на продолжительность одной интерации - 10 миллисекунд
	}else if(Math.abs(DurationOfAnimation/DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock))<=10){
		//Если минимальное время задержки будет 10, то шаг будет равен общему количеству пикселей, которые нужно пройти, деленные на количество 
		//шагов - частное от продолжительности анимации и минимальному времени анимации - 10 миллисекундам
		DelayBetweenIterations=10;
		
		ModuleChangeScrollLeftPerIteration=Math.abs(
		
			DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock)/(DurationOfAnimation/10)
		
		);
		
		//console.log('увеличили шаг');
		
	}
	
	//Настраиваем знак шага в зависимости от переданного параметра направления движения:
	
	//скролл должен идти вправо значит изменение положения скролла за итерацию должно быть положительным
	
	if(ScrollDirection=='Right'){
		
		ChangeScrollLeftPerIteration=ModuleChangeScrollLeftPerIteration;	
		
	//скролл должен идти влево значит изменение положения скролла за итерацию должно быть отрицательным
	}else if(ScrollDirection=='Left'){
		
		ChangeScrollLeftPerIteration=ModuleChangeScrollLeftPerIteration*(-1);	
		
	}
	
	
	setTimeout(function run(){
		
		if(
			
			//Условие для продолжения анимации разность координат центров переданного блока и контейнера должна быть отлична от нуля 
			DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock)!=0
			&& AnimationCanHappening==true//И анимация не была остановлена пользователем (анимация может происходить)
			
		){
			
			if(
				//Если разность разности между серединой переданного дочернего блока и серединой контейнера и шагом больше нуля, то
				//продолжаем движение и изменяем Container.scrollLeft на этот шаг
				
				(DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock)-ChangeScrollLeftPerIteration)>0
				&&
				ScrollDirection=='Right'
				
				||
				
				(DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock)-ChangeScrollLeftPerIteration)<0
				&&
				ScrollDirection=='Left'
				
			){
				
				Container.scrollLeft=Container.scrollLeft+ChangeScrollLeftPerIteration;//Изменяем  свойство scrollLeft на заранее определенную величну
				setTimeout(run, DelayBetweenIterations);//Запускаем функцию еще раз, так как после изменения Container.scrollLeft разность координат середин контейнера и 
				//переданного дочернего блока не станет равной нулю
			
			}else{
				
				Container.scrollLeft=Container.scrollLeft+DifferenceBetweenCoordinateChildrenBlockAndContainer(NumberOfChildrenBlock);
				
				
				TimeOfEnd=new Date().getTime();//Время конца анимации
				
				console.log(TimeOfEnd-TimeOfStart);//Вывод времени анимации		
			}
			
			WriteInformaionAboutScroll();//Печатаем информацию
	
		}
		
	}, DelayBetweenIterations);
	
}





*/












