function weapon_type(name, damage, range) {
	this.name = name;
	this.damage = damage;
	this.range = range;
}

var unarmed = new weapon_type("unarmed", 0)
var dagger = new weapon_type("dagger", 1)
var shortsword = new weapon_type("shortsword", 2)
var longsword = new weapon_type("longsword", 3)
var spear = new weapon_type("spear", 4)







var start_over = true


while(start_over){
	alert("You have entered The Arena, a grand coliseum in which fighters are pitted against each other in death matches.\
The winners earn glory and riches untold. The losers, well, they die.")

	alert("After filling out the necessary paperwork and liability forms, you are escorted to the entrance of the fighting pit. The basic procedure is as follows: \
You will be told who your opponent is for the next battle, then allowed to chose your weapon for that fight. Each weapon deals different amounts of damage \
and may be better or worse depending on the enemy's gear, so choose wisely.")





	var weapon_choice_loop = true

	do {

		var weapon_choices = ["", "dagger", "shortsword", "longsword", "spear"];
		var weapon_choice = prompt("Before you lays a table with an assortment of weapons on it. \
You have your choice of a 'dagger', 'shortsword', 'longsword', or 'spear'.").toLowerCase()

		if (weapon_choice.length == 0) {
			// empty hands case
			var dumbass = prompt("Are you sure you want to fight this enemy empty-handed? (yes/no)").toLowerCase()
					if (dumbass == 'yes'){
						weapon_choice = "unarmed"
						weapon_choice_loop = false
					}
		} else if (weapon_choices.indexOf(weapon_choice) > -1) {
			alert("You have chosen the " + weapon_choice + ".");
			weapon_choice_loop = false
		} else {
			alert("Sorry, that's not one of the weapons listed. Try again!")
		}

	}while(weapon_choice_loop)

	var weapon_damage = 0;
	var weapon_length = 1;

	if (weapon_choice == "dagger"){
		weapon_damage = 4;
		weapon_length = 2;
	}
	else if (weapon_choice == "shortsword"){
		weapon_damage = 3;
		weapon_length = 3;
	}
	else if (weapon_choice == "longsword"){
		weapon_damage = 3;
		weapon_length = 4;
	}
	else if (weapon_choice == "spear"){
		weapon_damage = 3;
		weapon_length = 5;
	}
	else {
		weapon_damage = 1;
		weapon_length = 1;
	}

	alert("You enter the pit. Across from you is the goblin, snarling and ready to fight. What do you do?")

	alert("You may move up to two times before attacking or ending your turn. If you attack, your turn will end immediately afterwards.")

	var enemy_distance = 7
	var enemy_health = 10
	var you_health = 10
	var pounce_timer = 0
	var cc = 0

	function phase_move() {
		alert("You are " + enemy_distance + " units away from the enemy.")

		var redo = true;

		while (redo) {
			var turn = prompt("Would you like to move 'forward', move 'backward', or 'not' move?").toLowerCase();
			switch(turn){
				case 'forward':
					if(enemy_distance > 1){
						enemy_distance -= 1
						alert("You move 1 unit closer to the enemy.")
						redo = false;
					}
					else{
						alert("You're too close to move forward any more!")
					}
					break;
				case 'backward':
					if(enemy_distance < 10){
						enemy_distance += 1
						alert("You move 1 unit further from the enemy.")
						redo = false
					}
					else{
						alert("You can't move any further away from the enemy!")
					}
					break;
				case 'not':
					alert("You choose not to move.")
					redo = false
					return 'not'
					break;
				default:
					alert("That's not a valid move!")
			}
		}
	}

	function phase_attack() {
		var redo = true
		while(redo){
			var turn = prompt("Would you like to 'attack', or 'end' your turn?").toLowerCase();
			switch(turn){
				case 'attack':
				if(weapon_length < enemy_distance){
					alert("You attack, but you're too far away to hit the enemy!")
					redo = false
				}
				else if(weapon_length > enemy_distance){
					alert("You attack, but you're too close to get a strong hit on your enemy!")
					alert("You deal " + (weapon_damage - 1) + " damage to the enemy!")
					enemy_health -= (weapon_damage - 1)	
					redo = false
				}
				else{
					alert("You get a good hit on the enemy!")
					alert("You deal " + weapon_damage + " damage to the enemy!")
					enemy_health -= weapon_damage
					redo = false
				}
				break;
			case 'end':
				alert("You end your turn.")
				redo = false
				return 'end'
				break;
			default:
				alert("That's not a valid move!")
			}
		}
	}

	function turn_goblin(){
		if(enemy_distance > 1){
			enemy_distance --
			alert("The goblin moves 1 unit closer!")
		}
		else{
			alert("The goblin tried to move closer, but it's already right in front of you!")
		}
		if(enemy_distance == 3){
			alert("The goblin gets a good swing with its shortsword!")
			alert("You take 3 damage.")
			you_health -= 3
		}
		else if(enemy_distance < 3){
			alert("The goblin attacks, but it's too close to get a strong hit on you!")
			alert("You take 2 damage.")
			you_health -=2
		}
		else{
			alert("The goblin attacks, but it's too far away to hit you!")
		}
	}
	function combat(enemy_turn){

		if (cc === 0){
			var phase_move_count = 0;
			do{
				var move_taken = phase_move();
				phase_move_count++;
			} while (move_taken != 'not' && phase_move_count < 2)

			phase_attack()
		}
		else{
			alert("You cannot move this turn.")
			cc --
		}

		alert("You have " + you_health + " health.")
		alert("Your enemy has " + enemy_health + " health")

		if(enemy_health > 0 && you_health > 0){
			enemy_turn()
			alert("You have " + you_health + " health.")
			alert("Your enemy has " + enemy_health + " health")
		}
	}
	var fighting = true
		while(fighting){

			combat(turn_tiger)

			if(enemy_health <= 0){
				alert("You have defeated the enemy!")
			fighting = false
			start_over = false
			}

			if(you_health <= 0){
				alert("Your enemy has rendered you a gruesome death!")
				var retry = confirm("It seems you were merely one of the many warriors who have fallen in their quest for gold and glory.\
	 Luckily you are only playing a game, so you have the option to restart. Would you like to try again?")
				if(retry){
					var enemy_distance = 7
					var enemy_health = 10
					var you_health = 10
					var pounce_timer = 0
					var cc = 0
				}
				else{
					fighting = false
					start_over = false
				}
			}
		}
	function turn_tiger(){
		if (pounce_timer == 0 && enemy_distance > 1){
			pounce_timer ++;
			alert("The tiger snarls and crouches down, preparing to pounce.")
		}
		else if (pounce_timer == 1 && enemy_distance > 1){
			pounce_timer --;
			enemy_distance -= 3;
			alert("The tiger leaps at you!")
				if (enemy_distance < 0){
					alert("The tiger's claws scratch you as it leaps past!")
					alert("You take 3 damage.")
					you_health -= 3
					enemy_distance = -enemy_distance
				}
				else if (enemy_distance = 0){
					alert("The tiger leaps onto you, knocking you down!")
					alert("You take 3 damage. You won't be able to move next turn.")
					you_health -= 3
					cc ++
					enemy_distance = 1
				}
				else{
					alert("You were too far away for the tiger to pounce on you. It's attack misses.")
				}
		}
		else{
			alert("The tiger swipes at you with its razor sharp claws!")
			alert("You take 3 damage.")
			you_health -= 3
		}
	}
}







