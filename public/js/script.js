$(document).ready(function(){
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
		
		$.get('get-lockers', function(data, status){
			var lockerReserves = []
			
			locationSelect.val(locations[0].locationName)
			
			var currLocation = locationSelect.val();
			console.log(currLocation)

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
				$.get('get-locker-reserves', function(data, status){
					data.forEach(function(item, index){
						var lockerReserve = {
							studentIdNo: item.studentIdNo,
							Locker: item.Locker,
							status: item.status
						}
						lockerReserves.push(lockerReserve)
					})
					initTable(currLocation, item, lockerReserves, lockersTable, rows[rowCtr], ctr)
					
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
			})
			
			locationSelect.change(function(){
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
					$.get('get-locker-reserves', function(data, status){
						data.forEach(function(item, index){
							var lockerReserve = {
								studentIdNo: item.studentIdNo,
								Locker: item.Locker,
								status: item.status
							}
							lockerReserves.push(lockerReserve)
						})
						initTable(currLocation, item, lockerReserves, lockersTable, rows[rowCtr], ctr)

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
				})

				$("#lockers-table td").hide();
				$("input[name='status']").each(function(){
					if($(this)[0].checked){
						var status = $(this).val();
						$("[value=" + status + "]").show();
					}
				})
			})
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
	
	function initTable(currLocation, locker, lockerReserves, lockersTable, row, ctr){
		if(locker.location == currLocation){
			var lockerTd = $("<td></td>");
			var button = $("<input>");
			
			lockerTd.text(locker.lockerNo);
			button.attr("type", "checkbox")
			button.attr("name", "lockerName")
			button.attr("value", locker.lockerNo)
			lockerTd.append(button);
			lockerTd.attr("name", "status")
			
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

			button.click(function(){
				$("#location-name-selected").attr("value", locker.location);
				$("#locker-selected").attr("value", locker.lockerNo);
			})
			
			lockerTd.append(button)
			row.append(lockerTd)
			
			for(let i = 0; i < lockerReserves.length; i++){
				if(lockerReserves[i].studentIdNo == $("#id-no").val()){
					lockerTd.attr("data-toggle", "popover")
					lockerTd.attr("data-content", "Sorry, but you cannot reserve another locker. Cancel your reservation first to reserve another locker.")
					lockerTd.popover()
					lockerTd.click(function(){
						setTimeout(function(){
							lockerTd.popover('hide')
						}, 1500)
					})
				}
				
				if(lockerReserves[i].Locker.lockerNo == locker.lockerNo){
					if(lockerReserves[i].Locker.location == locker.location){
						if(lockerReserves[i].status == "reserved"){
							lockerTd.attr("class", "reserved")
							lockerTd.css({
								"height": "130px",
								"width": "130px",
								"display": "inline-block",
								"background-color": "dodgerblue",
								"color": "azure"
							})
							lockerTd.attr("value", "reserved")
							
							//lockerTd.attr("data-container", "body")
							lockerTd.attr("data-toggle", "popover")
							lockerTd.attr("data-content", "Sorry, but this locker is currently reserved by someone else. Find an availble locker to reserve.")
							lockerTd.popover()
							lockerTd.click(function(){
								setTimeout(function(){
									lockerTd.popover('hide')
								}, 1500)
							})
						}
						else if(lockerReserves[i].status == "owned"){
							lockerTd.attr("class", "owned")
							lockerTd.css({
								"height": "130px",
								"width": "130px",
								"display": "inline-block",
								"background-color": "darkred",
								"color": "azure"
							})
							lockerTd.attr("value", "owned")
							
							lockerTd.attr("data-toggle", "popover")
							lockerTd.attr("data-content", "Sorry, but this locker is already owned by someone else. Find an availble locker to reserve.")
							lockerTd.popover()
							lockerTd.click(function(){
								setTimeout(function(){
									lockerTd.popover('hide')
								}, 1500)
							})
						}
					}
					
				}
			}

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
		
	}
})

function goToProfile(){
	$("#profile-hidden").submit()
}
