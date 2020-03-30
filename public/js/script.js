$(document).ready(function(){
	function initTable(locker, lockersTable, row, rowCtr){
		lockersTable.empty();

		var nLockersSelected = 0;

		for(let i = 0; i < locations.length; i++){
			if(currLocation == locations[i].locationName){
				nLockersSelected = locations[i].nTotalLockers;
			}
		}

		var rows = []
		for(let row = 0; row < nLockersSelected/5; row++){
			var lockerTr = $("<tr></tr>");
			rows.push(lockerTr)
			lockersTable.append(rows[row]);
		}
		
		var lockerTd = $("<td></td>");
		var button = $("<input>");
		button.attr("type", "checkbox")
		button.attr("name", "lockerName")
		button.attr("value", locker.lockerNo)
		lockerTd.text(lockers[i].lockerNo);
		lockerTd.append(button);

		lockerTd.attr("class", "available")
		lockerTd.css({
			"height": "130px",
			"width": "130px",
			"display": "inline-block",
			"background-color": "green",
			"color": "azure"
		})
		
		console.log(lockerTd.attr("id"))

		lockerTd.append(cellButton)
		rows[rowCtr].append(lockerTd)
		ctr++;

		/*var rowCtr = 0;
		var ctr = 0;
		for(let i = 0; i < lockers.length; i++){
			var lockerTd = $("<td></td>");
			if(lockers[i].location == currLocation){ 
				var button = $("<input>");
				button.attr("type", "checkbox")
				button.attr("name", "lockerName")
				button.attr("value", lockers[i].lockerNo)
				lockerTd.text(lockers[i].lockerNo);
				lockerTd.append(button);

				if(lockers[i].reserved == true){
					lockerTd.attr("class", "reserved")
					lockerTd.css({
						"height": "130px",
						"width": "130px",
						"display": "inline-block",
						"background-color": "dodgerblue",
						"color": "azure"
					})
				}
				else if(lockers[i].owned == true){
					lockerTd.attr("class", "owned")
					lockerTd.css({
						"height": "130px",
						"width": "130px",
						"display": "inline-block",
						"background-color": "darkred",
						"color": "azure"
					})

				}
				else{
					lockerTd.attr("class", "available")
					lockerTd.css({
						"height": "130px",
						"width": "130px",
						"display": "inline-block",
						"background-color": "green",
						"color": "azure"
					})

				}
				console.log(lockerTd.attr("id"))

				rows[rowCtr].append(lockerTd)
				ctr++;

				if(ctr < 5){
				}
				else{
					rowCtr++;
					ctr = 0;
				}
			}
		}

		$("input[name='lockerName']").css({
			"height": "130px",
			"width": "130px",
			"margin-top": "-18px",
			"margin-left": "1px",
			"position": "relative",
			"opacity": "0",
			"display": "block"
		})*/
	}
	
	
	$.get('view-lockers', function(data, status){
		var lockersTable = $("#lockers-table")
		
		console.log(data)
                    
		$("#cancel-reminder").hide();

		lockersTable.empty();

		var nLockersSelected = 0;

		for(let i = 0; i < locations.length; i++){
			if(currLocation == locations[i].locationName){
				nLockersSelected = locations[i].nTotalLockers;
			}
		}
		
		var rowCtr = 0;
		var ctr = 0;

		var rows = []
		for(let row = 0; row < nLockersSelected/5; row++){
			var lockerTr = $("<tr></tr>");
			rows.push(lockerTr)
			lockersTable.append(rows[row]);
		}
		
		data.forEach(function(item, index){
			initTable(item, lockersTable, rows[rowCtr], rowCtr)
			if(ctr < 5){
			}
			else{
				rowCtr++;
				ctr = 0;
			}
		})
	})
})