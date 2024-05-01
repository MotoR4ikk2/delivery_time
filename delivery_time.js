document.addEventListener("DOMContentLoaded", function() {
    const currentDate = new Date();
    const umt_settings = umt_settings_data; //Отримані дані з бекенду wordpress
    const currentDayOfWeek = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const curentPageLang = document.documentElement.lang;
    const deliveryWorkTime = parseInt(umt_settings.umt_same_day_shipping_time.split(":")[0]);
    const shopDeliveryDay = umt_settings.umt_working_days.map(function(element){
        return parseInt(element, 10);
    });

    const getElementDay = document.querySelectorAll('.delivery_day');
    
    const isWorkDay = shopDeliveryDay.includes(currentDayOfWeek);


    function nextDeliveryDay(shopDeliveryDay, currentDayOfWeek, curentPageLang){
        const curentDay = currentDayOfWeek;
        let nextDay = curentDay + 1;
        while (!shopDeliveryDay.includes(nextDay % 7)){
            nextDay++;
        }
        const dayNames = {
            'en-US': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'uk': ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П`ятниця', 'Субота'],
            'ru-RU': ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
        };
       
        const weekDayName = dayNames[curentPageLang][nextDay];
        return { weekDayName: weekDayName, nextDay: nextDay % 7 };
    }

    const deliveryLang = 
        {
            'en-US': {today: 'Today', tomorrow: 'Tomorrow' },
            'uk': {today: 'Сьогодні', tomorrow: 'Завтра'},
            'ru-RU': {today: 'Сегодня', tomorrow: 'Завтра'}
        };

    const isNextDeliveryDay = nextDeliveryDay(shopDeliveryDay, currentDayOfWeek, curentPageLang);
    const isBeforeWorkTime = currentHour < deliveryWorkTime;

    let deliveryDay;

    if (isWorkDay && isBeforeWorkTime) {
        deliveryDay = deliveryLang[curentPageLang].today;

    } else if ((isNextDeliveryDay.nextDay - currentDayOfWeek) == 1 ) {
        deliveryDay = deliveryLang[curentPageLang].tomorrow;

    } else if (!isWorkDay) {
        deliveryDay = isNextDeliveryDay.weekDayName;

    } else {
        deliveryDay = deliveryLang[curentPageLang].tomorrow;
    }
    
    getElementDay.forEach(function(element){
      element.textContent = deliveryDay;
    });
   
    });
