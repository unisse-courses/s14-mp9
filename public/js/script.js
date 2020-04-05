$(document).ready(function(){
	var lockersTable = $("#lockers-table")
	var manageLockersTable = $("#manage-lockers-table")
	var locationSelect = $("#location-select");
	
	$.get('get-locations', function(data, status){
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
			
			$("#location-name-selected").attr("value", currLocation)
			$("#location-name-selected").text(currLocation)

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
				manageLockersTable.append(rows[row]);
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

				$("#location-name-selected").attr("value", currLocation)
				$("#location-name-selected").text(currLocation)
				
				$("#lockers-table td").hide();
				$("input[name='status']").each(function(){
					if($(this)[0].checked){
						var status = $(this).val();
						$("[value=" + status + "]").show();
					}
				})
			})
		})
		
	})
	
	$.get('get-requests', function(data, status){
		var resLocationSelect = $(".locker-reserve-manager #reserve-location-select");
		var ownLocationSelect = $(".locker-own-manager #reserve-location-select");
		var abandonLocationSelect = $(".locker-abandon-manager #reserve-location-select");

		var ridHeader, rlockerNoHeader, rlocationHeader, rcheckHeader;
		var rCtr = 0, oCtr = 0, aCtr = 0;
		
		var marker = "reserved";

		resLocationSelect.val("all");
		ownLocationSelect.val("all");
		abandonLocationSelect.val("all");
		
		ridHeader = $("<td></td>").text("ID Number");
		rlockerNoHeader = $("<td></td>").text("Reserved Locker Number");
		rlocationHeader = $("<td></td>").text("Reserved Locker Location");
		rcheckHeader = $("<td></td>");

		var hrow, thead;
		hrow = $("<tr></tr>");
		thead = $("<thead></thead>");
		hrow.append(rcheckHeader);
		hrow.append(ridHeader);
		hrow.append(rlockerNoHeader);
		hrow.append(rlocationHeader);
		thead.append(hrow);
		
		$("#reserve-select").click(function(){
			$("#reserve-select").attr("class", "nav-link active")
			$("#own-select").attr("class", "nav-link")

			$(".reserve-locker-section #lockers-reserve-table > tr").remove();
			$(".locker-own-manager #lockers-reserve-table > tr").remove();
			$(".locker-abandon-manager #lockers-reserve-table > tr").remove();
			
			$(".reserve-locker-section").show()
			$(".owned-locker-section").hide()
			
			rCtr = 0; 
			oCtr = 0; 
			aCtr = 0;
		
			
			if(resLocationSelect.val() == "all"){
				data.forEach(function(item, index){
					initReserveAllTable(item, "reserved")

					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
				
			}
			else{
				data.forEach(function(item, index){
					initReserveTable(resLocationSelect.val(), item, "reserved")

					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
			   	
			}
			
			if(ownLocationSelect.val() == "all"){
				data.forEach(function(item, index){
					initReserveAllTable(item, "owned")
					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
			}
			else{
				data.forEach(function(item, index){
					initReserveTable(ownLocationSelect.val(), item, "owned")
					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
			   	
			}
			
			if(abandonLocationSelect.val() == "all"){
				data.forEach(function(item, index){
					initReserveAllTable(item, "abandoned")
					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
			}
			else{
				data.forEach(function(item, index){
					initReserveTable(abandonLocationSelect.val(), item, "abandoned")
					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
			   	
			}
			
			$("#reserve-label").text("Manage Reservations " + "(" + rCtr + ")")
			$("#own-label").text("View Owned Lockers " + "(" + oCtr + ")")
			$("#abandon-label").text("Manage Abandon Requests " + "(" + aCtr + ")")
		})

		$("#own-select").click(function(){
			$("#reserve-select").attr("class", "nav-link")
			$("#own-select").attr("class", "nav-link active")

			console.log("select")
			
			
			$(".reserve-locker-section #lockers-reserve-table > tr").remove();
			$(".locker-own-manager #lockers-reserve-table > tr").remove();
			$(".locker-abandon-manager #lockers-reserve-table > tr").remove();
			
			$(".reserve-locker-section").hide()
			$(".owned-locker-section").show()
			
			rCtr = 0; 
			oCtr = 0; 
			aCtr = 0;
			
			if(resLocationSelect.val() == "all"){
				data.forEach(function(item, index){
					initReserveAllTable(item, "reserved")

					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
				
			}
			else{
				data.forEach(function(item, index){
					initReserveTable(resLocationSelect.val(), item, "reserved")

					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
			   	
			}
			
			if(ownLocationSelect.val() == "all"){
				data.forEach(function(item, index){
					initReserveAllTable(item, "owned")
					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
			}
			else{
				data.forEach(function(item, index){
					initReserveTable(ownLocationSelect.val(), item, "owned")
					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
			   	
			}
			
			if(abandonLocationSelect.val() == "all"){
				data.forEach(function(item, index){
					initReserveAllTable(item, "abandoned")
					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
			}
			else{
				data.forEach(function(item, index){
					initReserveTable(abandonLocationSelect.val(), item, "abandoned")
					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
			   	
			}
			
			
			$("#reserve-label").text("Manage Reservations " + "(" + rCtr + ")")
			$("#own-label").text("View Owned Lockers " + "(" + oCtr + ")")
			$("#abandon-label").text("Manage Abandon Requests " + "(" + aCtr + ")")
		})
		
		data.forEach(function(item, index){
			initReserveAllTable(item, "reserved")

			if(item.status == "reserved" ){
				rCtr++;
			}
			else if(item.status == "owned"){
				oCtr++;
			}
			else if(item.status == "abandoned"){
				aCtr++;
			}

			$("#reserve-label").text("Manage Reservations " + "(" + rCtr + ")")
			$("#own-label").text("View Owned Lockers " + "(" + oCtr + ")")
			$("#abandon-label").text("Manage Abandon Requests " + "(" + aCtr + ")")
		})

		resLocationSelect.change(function(){
			var selectedLocation = $(this).val();
			
			$(".locker-reserve-manager #lockers-reserve-table > tr").remove();
			
			rCtr = 0; 
			oCtr = 0; 
			aCtr = 0;
			
			if(selectedLocation == "all"){
				data.forEach(function(item, index){
					initReserveAllTable(item, "reserved")
					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}

				})
				
			}
			else{
				data.forEach(function(item, index){
					initReserveTable(selectedLocation, item, "reserved")

					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
			   	
			}
			
			$("#reserve-label").text("Manage Reservations " + "(" + rCtr + ")")
			$("#own-label").text("View Owned Lockers " + "(" + oCtr + ")")
			$("#abandon-label").text("Manage Abandon Requests " + "(" + aCtr + ")")
			
		})

		ownLocationSelect.change(function(){
			var selectedLocation = $(this).val();
		
			$(".locker-own-manager #lockers-reserve-table > tr").remove();
			
			rCtr = 0; 
			oCtr = 0; 
			aCtr = 0;
			
			if(selectedLocation == "all"){
				data.forEach(function(item, index){
					initReserveAllTable(item, "owned")
					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}

				})
				
			}
			else{
				data.forEach(function(item, index){
					initReserveTable(selectedLocation, item, "owned")

					if(item.status == "reserved" ){
						rCtr++;
					}
					else if(item.status == "owned"){
						oCtr++;
					}
					else if(item.status == "abandoned"){
						aCtr++;
					}
				})
			   	
			}
			
			$("#reserve-label").text("Manage Reservations " + "(" + rCtr + ")")
			$("#own-label").text("View Owned Lockers " + "(" + oCtr + ")")
			$("#abandon-label").text("Manage Abandon Requests " + "(" + aCtr + ")")
			
		})

		abandonLocationSelect.change(function(){
			var selectedLocation = $(this).val();

			$(".locker-abandon-manager #lockers-reserve-table > tr").remove();
			
			rCtr = 0; 
			oCtr = 0; 
			aCtr = 0;
									 
			data.forEach(function(item, index){
				if(selectedLocation == "all"){
				   	initReserveAllTable(item, "abandoned")
				}
				else{
				   	initReserveTable(selectedLocation, item, "abandoned")
				}
				
				if(item.status == "reserved" ){
					rCtr++;
				}
				else if(item.status == "owned"){
					oCtr++;
				}
				else if(item.status == "abandoned"){
					aCtr++;
				}

				$("#reserve-label").text("Manage Reservations " + "(" + rCtr + ")")
				$("#own-label").text("View Owned Lockers " + "(" + oCtr + ")")
				$("#abandon-label").text("Manage Abandon Requests " + "(" + aCtr + ")")
			})
			
		})

		$("input[name='reserveCheck']").click(function(){
		var checkedValue;

			if($(this).is(":checked")){
				var check = $(this);
				checkedValue = $(this).val();
				//console.log("Reserve ID: " + checkedValue)

				$(".locker-reserve-manager #option-buttons #accept").click(function(){
					for(let i = 0; i < reservedLockers.length; i++){
						for(let j = 0; j < lockers.length; j++){
							if(reservedLockers[i].reserveID == checkedValue){
								if(reservedLockers[i].lockerNo == lockers[j].lockerNo &&
								  reservedLockers[i].location == lockers[j].location){
									var owner = new OwnedLocker(reservedLockers[i].lockerNo, reservedLockers[i].location, reservedLockers[i].lockCode, reservedLockers[i].reserveID);
									reservedLockers.splice(i, 1)

									lockers[i].owned = true
									lockers[i].reserved = false

									ownedLockers.push(owner);

									initResTable(resLocationSelect.val())
									initOwnTable(ownLocationSelect.val())
									//console.log(ownedLockers);
								}
							}
						}
					}
					$("input[type=checkbox]").prop('checked', false);
				})

				$(".locker-reserve-manager #option-buttons #reject").click(function(){
					for(let i = 0; i < reservedLockers.length; i++){
						if(reservedLockers[i].reserveID == checkedValue){
							reservedLockers.splice(i, 1);

							//console.log(reservedLockers);
							initResTable(resLocationSelect.val())
						}
					}
					$("input[type=checkbox]").prop('checked', false);
				})
			}
		})

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
			
			lockerTd.attr("class", "btn btn-primary")
			lockerTd.attr("data-toggle", "modal")
			
			if(lockersTable.attr("class") == "manage-table"){
				console.log(lockersTable.val())
				lockerTd.attr("data-target", "#manage-edit-selected-locker")
			}
			else{
				lockerTd.attr("data-target", "#validity-confirm")
			}
			
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
				$("#edit-location-name-selected").attr("value", locker.location);
				$("#locker-selected").attr("value", locker.lockerNo);
				$("#location-name-lockers-selected").attr("value", locker.lockerNo);
				$("#edit-locker-no-selected").attr("value", locker.lockerNo);
				$("#locker-code-current").text(locker.lockCode)
			})
			
			lockerTd.append(button)
			row.append(lockerTd)
			
			for(let i = 0; i < lockerReserves.length; i++){
				if(lockerReserves[i].studentIdNo == $("#id-no").val()){
					lockerTd.attr("data-toggle", "popover")
					
					if(lockerReserves[i].status == "reserved"){
					   lockerTd.attr("data-content", "Sorry, but you cannot reserve another locker. Cancel your current reservation first to reserve another locker.")
					}
					else{
					   lockerTd.attr("data-content", "Sorry, but you cannot reserve another locker. Request to abandon your current locker first and wait for the request to be accepted to reserve another locker.")
					}
					
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
							lockerTd.css({
								"height": "130px",
								"width": "130px",
								"display": "inline-block",
								"background-color": "dodgerblue",
								"color": "azure"
							})
							lockerTd.attr("value", "reserved")
							
							
							lockerTd.attr("data-toggle", "popover")
							
							if(lockersTable.closest(".manage-lockers-box")){
								lockerTd.attr("data-content", "Sorry, but you cannot change a reserved locker. The locker code has already been set before the user reserved this locker")
							}
							else{
								lockerTd.attr("data-content", "Sorry, but this locker is currently reserved by someone else. Find an availble locker to reserve.")
							}
							
							lockerTd.popover()
							lockerTd.click(function(){
								setTimeout(function(){
									lockerTd.popover('hide')
								}, 1500)
							})
						}
						else if(lockerReserves[i].status == "owned"){
							lockerTd.css({
								"height": "130px",
								"width": "130px",
								"display": "inline-block",
								"background-color": "darkred",
								"color": "azure"
							})
							lockerTd.attr("value", "owned")
							
							lockerTd.attr("data-toggle", "popover")
							
							if(lockersTable.closest(".manage-lockers-box")){
								lockerTd.attr("data-content", "Sorry, but you cannot change a reserved locker. The locker code has already been set before the user reserved this locker")
							}
							else{
								lockerTd.attr("data-content", "Sorry, but this locker is already owned by someone else. Find an availble locker to reserve.")
							}
							
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
			
		}
		
	}
	
	function initReserveTable(currLocation, lockerReserve, marker){
		var row;
		var idNoTd, lockerNoTd, lockerLocTd, check;
		var checkForm, checkbox;
		
		
		if(currLocation == lockerReserve.Locker.location){
			row = $("<tr></tr>");

			var cLabel = $("<label></label>");
			cLabel.attr("class", "c-label")

			var cSpan = $("<span></span>");
			cSpan.attr("class", "c-span")

			checkbox = $("<input>");
			checkbox.attr("type", "checkbox")
			checkbox.attr("name", "reserveCheck");
			checkbox.attr("value", lockerReserve.studentIdNo);

			idNoTd = $("<td></td>").text(lockerReserve.studentIdNo);
			lockerNoTd = $("<td></td>").text(lockerReserve.Locker.lockerNo);
			lockerLocTd = $("<td></td>").text(lockerReserve.Locker.location);
			check = $("<td></td>");

			cLabel.append(checkbox)
			cLabel.append(cSpan)

			row.attr("id", lockerReserve.studentIdNo);
			
			if(lockerReserve.status == "owned"){
				
			}
			else{
				row.append(cLabel)
			}
			
			//row.append(cLabel)
			row.append(idNoTd)
			row.append(lockerNoTd)
			row.append(lockerLocTd)

			if(lockerReserve.status == "reserved" && marker == "reserved"){
				checkbox.attr("name", "reserveCheck");
				$(".locker-reserve-manager #lockers-reserve-table").append(row)
			}
			else if(lockerReserve.status == "owned" && marker == "owned"){
				checkbox.attr("name", "reserveCheck");
				$(".locker-own-manager #lockers-reserve-table").append(row)
			}
			else if(lockerReserve.status == "abandoned" && marker == "abandoned"){
				checkbox.attr("name", "abandonCheck");
				$(".locker-abandon-manager #lockers-reserve-table").append(row)
			}
			
		}
	}
	
	function initReserveAllTable(lockerReserve, marker){
		var row;
		var idNoTd, lockerNoTd, lockerLocTd, check;
		var checkForm, checkbox;
		
		row = $("<tr></tr>");

		var cLabel = $("<label></label>");
		cLabel.attr("class", "c-label")

		var cSpan = $("<span></span>");
		cSpan.attr("class", "c-span")

		checkbox = $("<input>");
		checkbox.attr("type", "checkbox")
		checkbox.attr("name", "reserveCheck");
		checkbox.attr("value", lockerReserve.studentIdNo);

		idNoTd = $("<td></td>").text(lockerReserve.studentIdNo);
		lockerNoTd = $("<td></td>").text(lockerReserve.Locker.lockerNo);
		lockerLocTd = $("<td></td>").text(lockerReserve.Locker.location);
		check = $("<td></td>");

		cLabel.append(checkbox)
		cLabel.append(cSpan)

		row.attr("id", lockerReserve.studentIdNo);
		
		if(lockerReserve.status == "owned"){
				
		}
		else{
			row.append(cLabel)
		}
		
		row.append(idNoTd)
		row.append(lockerNoTd)
		row.append(lockerLocTd)

		if(lockerReserve.status == "reserved" && marker == "reserved"){
			checkbox.attr("name", "reserveCheck");
			$(".locker-reserve-manager #lockers-reserve-table").append(row)
		}
		else if(lockerReserve.status == "owned" && marker == "owned"){
			checkbox.attr("name", "reserveCheck");
			$(".locker-own-manager #lockers-reserve-table").append(row)
		}
		else if(lockerReserve.status == "abandoned" && marker == "abandoned"){
			checkbox.attr("name", "abandonCheck");
			$(".locker-abandon-manager #lockers-reserve-table").append(row)
		}
	}
})

function goToProfile(){
	$("#profile-hidden").submit()
}
