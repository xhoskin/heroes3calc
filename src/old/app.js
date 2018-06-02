//
// == Существo
// ------------------------------------------------------------

function Creature( name, level, damageMin, damageMax, attack, defense, health, speed, growth, goldPrice, resourcePrice ) {
    //properties
    this.name          = name,
    this.level         = level,
    this.damageMin     = damageMin,
    this.damageMax     = damageMax,
    this.attack        = attack,
    this.defense       = defense,
    this.health        = health,
    this.speed         = speed,
    this.growth        = growth,
    this.goldPrice     = goldPrice,
    this.resourcePrice = resourcePrice
}

//методы существа
Creature.prototype.print = function(army) {
    var table = $('#' + army + '-creature'),
        damage = this.damageMin + "-" + this.damageMax ;
    table.show();
    for ( var key in this ) {
        $(table).find('[data-value="' + key + '"]').text( this[key] );
    }
    if ( this.damageMin === this.damageMax ) {
        damage = this.damageMin
    }
    $(table).find('[data-value="damage"]').text( damage );
    $(table).find('[data-value="price"]').html( 
            this.resourcePrice === '' ? this.goldPrice : this.goldPrice + "<br>" + this.resourcePrice 
            );

    if ( army === 'player') {
        battle.player = this;
    } else {
        battle.defenser = this;
    }
};


//
// == Город
// ------------------------------------------------------------

function City( name, list ) {
    //properties
    this.name      = name;
    this.list      = [];
    list.add( this );
}


// вывод на экран существ из города
City.prototype.print = function(army){
    var self = this;

    $('#' + army + '-creatures').empty();

    for (var i = 0; i < this.list.length; i++) {
        var value = this.list[i],
            output = 
                '<li><a href="#" data-creature="' + i +
                '" data-city="' + this.name + '">' + 
                value.name + '</a></li>\n';
        $('#' + army + '-creatures').append(output);
        
        //events binding
        $('#' + army + '-creatures a').on('click', function(e){
            e.preventDefault();
            var id   = $(this).data('creature');
            self.list[id].print(army);
        });
    }
}

//добавление существа в город
City.prototype.addCreature = function( name, level, damageMin, damageMax, attack, defense, health, speed, growth, goldPrice, resourcePrice ){
    this.list.push( new Creature( name, level, damageMin, damageMax, attack, defense, health, speed, growth, goldPrice, resourcePrice) );
}


//
// == Список городов
// ------------------------------------------------------------

function CityList() {
    this.list = [];
}

// добавить город в список
CityList.prototype.add = function(obj){
    this.list.push(obj);
}

// вывод списка городов
CityList.prototype.print = function() {
    var self = this;

    for ( var v in this.list ) {
        $('.city-list').append( '<li><a href="#" data-city="' + v + '">' + this.list[v].name + '</a></li>' );
    }
    
    //events binding
    $('.city-list a').on('click', function(){
        var id   = $(this).data('city');
        var army = $(this).parent().parent().data('army');
        $(this).tab('show');
        self.list[id].print(army);
    });
};



//
// == Расчеты
// ------------------------------------------------------------

function Calculate() {
    return this;
}

// Рассчитать урон
Calculate.prototype.damage = function(baseDmg, oursNum){
    // количество атакующих существ
    if ( isNaN(oursNum * 1) ) {
        var oursNum   = $('#player-creature-number').val();
    }

    // baseDmg -  базовый урон существа

    // условный множитель урона 
    // зависит от того, больше или меньше атака и защита
    if ( battle.player.attack >= battle.defenser.defense ) {
        var multDmg = 0.05;
    } else {
        var multDmg = 0.025;
    }

    // модификатор урона
    // если атака больше, то за каждую единицу +5% урона
    // если защита больше, то за каждую единицу +2,5% урона
    // МD(баз) = (Атака - Защита) * 0,05  
    // MD(баз) = (Атака - Защита) * 0,025 
    var modDmg = ( battle.player.attack - battle.defenser.defense ) * multDmg;

    // допустимый промежуток для модификатора: [-70%, 300%] урона
    if ( modDmg > 3 ) { 
        modDmg = 3;
    } else if ( modDmg < -0.7 ) { 
        modDmg = -0.7;
    }

    // урон с учетом модификатора
    var modifiedDmg = baseDmg * modDmg;

    // итоговая формула урона
    var totalDmg = (modifiedDmg + baseDmg) * oursNum;
    var totalDmgRounded = Math.round( (modifiedDmg + baseDmg) * oursNum );

    return {
        baseDmg:  baseDmg * oursNum,
            modDmg:   ( modDmg * 100 ),
            totalDmg: totalDmg
    }

}

// рассчитывает, сколько существ нужно, чтобы убить одним ударом
Calculate.prototype.kill = function(){
    var calc = this;

    // количество атакующих существ
    var oursNum   = $('#player-creature-number').val();

    // количество защищающихся существ
    var theirsNum = $('#enemy-creature-number').val();

    var dmg = {
        min: calc.damage(battle.player.damageMin, 1).totalDmg,
        max: calc.damage(battle.player.damageMax, 1).totalDmg
    };

    var needToKill = {
        min: battle.defenser.health * theirsNum / dmg.min,
        max: battle.defenser.health * theirsNum / dmg.max
    };

    return needToKill;
}

// рассчитывает, сколько здоровья останется после удара
Calculate.prototype.healthLeft = function(){
    var calc = this;

    var dmg = {
        min: calc.damage(battle.player.damageMin).totalDmg,
        max: calc.damage(battle.player.damageMax).totalDmg
    }

    var healthLeft = {
        min: battle.defenser.health - dmg.min,
        max: battle.defenser.health - dmg.max,
    }

    if ( healthLeft.min < 0 ) { healthLeft.min = 0 }
    if ( healthLeft.max < 0 ) { healthLeft.max = 0 }

    return healthLeft;
}


//
// == Поле боя
// ------------------------------------------------------------

function Battlefield() {
    this.player = {},
    this.defenser = {},
    this.inputs  = {
        playerNum:  $('#player-creature-number'),
        enemyNum:   $('#enemy-creature-number'),
    },

    this.results  = {
        damageBase:  $('#calc-damage-base'),
        damageMod:   $('#calc-damage-mod'),
        damageTotal: $('#calc-damage-total'),
        healthLeft:  $('#calc-health-left'),
        kill:        $('#calc-kill')
    }
}

Battlefield.prototype.refresh = function(){
    var self = this;

    if ( calculate.damage(self.player.damageMin) != NaN )  {
        var min = calculate.damage(self.player.damageMin);
        var max  = calculate.damage(self.player.damageMax);
        var kill = calculate.kill();
        var health = calculate.healthLeft();

        self.results.damageBase.html(  min.baseDmg + '-' + max.baseDmg );
        self.results.damageMod.html(   Math.round(min.modDmg) + '%' );
        self.results.damageTotal.html( Math.round(min.totalDmg) + '-' + Math.round(max.totalDmg) );
        self.results.healthLeft.html(  Math.round(health.max) + '-' + Math.round(health.min)  );
        self.results.kill.html( Math.floor(kill.max) + '-' + Math.floor(kill.min)  );
    }
}

Battlefield.prototype.bindEvents = function(){
    var self = this;

    self.inputs.playerNum.on('input', self.refresh );
    self.inputs.enemyNum.on('input', self.refresh );
}
