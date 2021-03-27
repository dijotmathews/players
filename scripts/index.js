// setting up the players

const playerList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');


const setupUI = (user) => {
	if(user){
		loggedInLinks.forEach(item => item.style.display = 'block');
		loggedOutLinks.forEach(item => item.style.display = 'none');
	} else {
		loggedInLinks.forEach(item => item.style.display = 'none');
		loggedOutLinks.forEach(item => item.style.display = 'block');
	}
}

const setupPlayers = (data) => {

	if(data.length) {

		let html = '';

		data.forEach(doc => {
			const player = doc.data();
			console.log(player);

			const li = `
				<li> 
					<div class="collapsible-header grey lighten-4">${player.first_name}</div>
					<div class="collapsible-body white">
						<div class="row">
							<div class="col s4"> Last Name </div>
							<div class="col s4"> Gender </div>
							<div class="col s4"> Year of Birth </div>
						</div>		
						<div class="row">
							<div class="col s4"> ${player.last_name} </div>
							<div class="col s4"> ${player.gender} </div>
							<div class="col s4"> ${player.yob} </div>
						</div>					
					</div>
					
				</li>

			`;

			html += li;
		});

		playerList.innerHTML = html;

		
	} else {
		playerList.innerHTML = '<h5 class="center-align"> Login to view players.</h5>';
	}
	
}

document.addEventListener('DOMContentLoaded', function(){
	var modals = document.querySelectorAll('.modal');
	M.Modal.init(modals);

	var items = document.querySelectorAll('.collapsible');
	M.Collapsible.init(items);


});