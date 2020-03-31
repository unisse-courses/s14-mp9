$(document).ready(function(){
	function initTable(currLocation, locker, lockersTable, row){
		if(locker.location == currLocation){
			var lockerTd = $("<td></td>");
			var button = $("<input>");
			button.attr("type", "checkbox")
			button.attr("name", "lockerName")
			button.attr("value", locker.lockerNo)
			lockerTd.text(locker.lockerNo);
			lockerTd.append(button);

			lockerTd.attr("class", "checkbox-wrapper")
			lockerTd.attr("data-toggle", "modal")
			lockerTd.attr("data-target", "#validity-confirm")
			lockerTd.css({
				"height": "130px",
				"width": "130px",
				"display": "inline-block",
				"background-color": "green",
				"color": "azure"
			})
			lockerTd.attr("value", "available")

			lockerTd.attr("name", "status")
			/*if(lockers[i].owned == true && lockers[i].reserved == false){
			   lockerTd.attr("value", "owned")
			}
			else if(lockers[i].reserved == true && lockers[i].owned == false){
				lockerTd.attr("value", "reserved")
			}
			else if(lockers[i].owned == false && lockers[i].reserved == false){

			}*/

			button.click(function(){
				//$("#id-user-select").attr("value", $("#id-no").val())
				$("#location-name-selected").attr("value", locker.location);
				$("#locker-selected").attr("value", locker.lockerNo);
			})
			
			lockerTd.append(button)
			row.append(lockerTd)
			
			

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
		
	}
	
	function lockersInit(locations){
		
	}
	
	$.get('get-locations', function(data, status){
		var lockersTable = $("#lockers-table")
		var locationSelect = $("#location-select");
		
		var locations = [];
		
		data.forEach(function(item, index){
			var location = {
				locationName: item.locationName,
				nTotalLockers: item.nTotalLockers,
				availableLockers: item.availableLockers
			}
			locations.push(location)
		})
		
		console.log(locations)
		
		
		$.get('get-lockers', function(data, status){
			locationSelect.val(locations[0].locationName)
			
			var currLocation = locationSelect.val();
			
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
				initTable(currLocation, item, lockersTable, rows[rowCtr])
				ctr++;
				if(ctr < 5){
				}
				else{
					rowCtr++;
					ctr = 0;
				}
				
				$("input[name='lockerName']").css({
					"height": "130px",
					"width": "130px",
					"margin-top": "-18px",
					"margin-left": "1px",
					"position": "relative",
					"opacity": "0",
					"display": "block"
				})
			})
			
			
			/*locationSelect.change(function(){
				var currLocation = locationSelect.val();

				$("#cancel-reminder").hide();

				lockersTable.empty();

				for(let i = 0; i < locations.length; i++){
					if(currLocation == locations[i].locationName){
						nLockersSelected = locations[i].nTotalLockers;
					}
				}

				rowCtr = 0;
				ctr = 0;

				rows = []
				for(let row = 0; row < nLockersSelected/5; row++){
					var lockerTr = $("<tr></tr>");
					rows.push(lockerTr)
					lockersTable.append(rows[row]);
				}

				data.forEach(function(item, index){
					initTable(currLocation, item, lockersTable, rows[rowCtr])
					ctr++;
					if(ctr < 5){
					}
					else{
						rowCtr++;
						ctr = 0;
					}

					$("input[name='lockerName']").css({
						"height": "130px",
						"width": "130px",
						"margin-top": "-18px",
						"margin-left": "1px",
						"position": "relative",
						"opacity": "0",
						"display": "block"
					})
				})

				$("#lockers-table td").hide();
				$("input[name='status']").each(function(){
					if($(this)[0].checked){
						var status = $(this).val();
						$("[value=" + status + "]").show();
					}
				})
			})*/
		})
		
		
		
		
		/*locationSelect.change(function(){
				$("#cancel-reminder").hide();
				
				var selectedLocation = $(this).val();

				console.log(selectedLocation)
				
				lockersTable.empty();

				var nLockersSelected = 0;

				for(let i = 0; i < locations.length; i++){
					if(selectedLocation == locations[i].locationName){
						nLockersSelected = locations[i].nTotalLockers;
					}
				}

				var rowCtr = 0;
				var ctr = 0;

				var rows = []
				for(let row = 0; row < nLockersSelected/5; row++){
					var lockerTr = $("<tr></tr>");
					rows.push(lockerTr)
					console.log(lockerTr)
					lockersTable.append(rows[row]);
				}

				data.forEach(function(item, index){
					initTable(selectedLocation, item, lockersTable, rows[rowCtr])
					ctr++;
					if(ctr < 5){
					}
					else{
						rowCtr++;
						ctr = 0;
					}

					$("input[name='lockerName']").css({
						"height": "130px",
						"width": "130px",
						"margin-top": "-18px",
						"margin-left": "1px",
						"position": "relative",
						"opacity": "0",
						"display": "block"
					})
				})

				$("#lockers-table td").hide();
				$("input[name='status']").each(function(){
					if($(this)[0].checked){
						var status = $(this).val();
						$("[value=" + status + "]").show();

						//$("." + status).show();
					}
				})
			})*/
	})
	
	
})

function goToProfile(){
	$("#profile-hidden").submit()
}
