$(document).ready(function(){
	var viewLockers = $(".quick-menu-box input[type=submit]")
				
	viewLockers.mouseover(function(){
		$(".quick-menu-box").css({
			"background-image": "linear-gradient(to bottom, rgba(25, 41, 29, .95), rgba(13, 112, 40, 0.85)), url('../photo/IMG_8368.JPG')",
			"background-size": "cover"
		})
	})
	viewLockers.mouseout(function(){
		$(".quick-menu-box").css({
			"height": "760px",
			"width": "100%",
			"margin": '0',
			"position": "relative",
			"display": "inline-block",
			"overflow": "hidden",
			"background-image": "linear-gradient(to bottom, rgba(25, 41, 29, 0.80), rgba(13, 112, 40, 0.73)), url('../photo/IMG_8368.JPG')",
			"background-size": "cover",
			"transition-timing-function": "ease"
		})
	})
	
	
	var checked = false;
	var currentReserved;
	var locationList = $("#location-list");
	var locationSelect = $("#location-select");

	$(".modal-quick-reserve").hide()
	$("#quick-reminder").hide()
	$("#cancel-reminder").hide()

	$("input[name='status']").prop('checked', true);

	$("input[name='criteria']").click(function(){
		var checkedStatus;
		$("input[name='criteria']").not(this).prop('checked', false);
		//
		if($(this).is(":checked")){
			checkedStatus = $(this).val();
			console.log(checkedStatus)
		}
	})



	$("#legend tr td :checkbox").click(function(){
		$("#lockers-table td").hide();
		$("input[name='status']").each(function(){
			if($(this)[0].checked){
				var status = $(this).val();
				$("[value=" + status + "]").show();
			}
		})
	})

	$("input[name='lockerNumber']").on("change", function(){
		var checked = $(this)

		$("input[name='lockerNumber']").not(this).prop('checked', false)

		if(checked.is(":checked")){
			var checkedLocker = checked.val();

			$("input[name='lockerNumber']").not(this).each(function(){
				console.log($(this).val())
				for(let i = 0; i < lockers.length; i++){
					if(lockers[i].location == locationSelect.val()){
						if($(this).val() == lockers[i].lockerNo){
							if(lockers[i].owned == true){
								$(this).parent().css({
									"border": "none",
									"background-color": "darkred",
									"color": "azure"
								})
							}
							else if(lockers[i].reserved == true){
								$(this).parent().css({
									"border": "none",
									"background-color": "dodgerblue",
									"color": "azure"
								})
							}
							else if(lockers[i].reserved == false && 
								   lockers[i].owned == false){
								$(this).parent().css({
									"border": "none",
									"background-color": "green",
									"color": "azure"
								})
							}
						}
					}
				}
			})

			$(this).parent().css({
				"border": "7px solid black"
			})

			for(let i = 0; i < lockers.length; i++){
				if(lockers[i].location == locationSelect.val()){
					if(lockers[i].lockerNo == checkedLocker){
						if(lockers[i].reserved == true){
							$(".btn btn-primary").attr("data-content", "Locker " + lockers[i].lockerNo + ", " + lockers[i].location + " is reserved. Please pick an available one.")
						}
						else if(lockers[i].owned == true){
							$(".btn btn-primary").attr("data-content", "Locker " + lockers[i].lockerNo + ", " + lockers[i].location + " is owned. Please pick an available one.")
						}
						else {

						}
					}
				}
			}

		}
	})
	
	var statusForm = $(".profile-current-locker-info form[method='post']")
	var statusFormButton = $(".profile-current-locker-info form[method='post'] input[type='submit']")
	var profileLockerStatus = $("input[name='profileLockerStatus']")


	if($("input[name='lockerOwned']").val() == 'true'){
		$(".profile-current-locker-info").show();
		$(".reminder-current-locker-info").hide();

		if(profileLockerStatus.val() == 'reserved'){
			statusForm.attr("action", "cancel-reservation")
			statusFormButton.val("Cancel Reservation")
		}
		else if(profileLockerStatus.val() == 'owned'){
			statusForm.attr("action", "abandon-locker")
			statusFormButton.val("Abandon")
		}
		else if(profileLockerStatus.val() == 'abandoned'){
			statusForm.attr("action", "cancel-abandonment")
			statusFormButton.val("Cancel Abandoment")
		}
	}
	else{
		$(".reminder-current-locker-info").show();
		$(".profile-current-locker-info").hide();
	}
	
	var resultsTable = $("#results-search");
                
	$("input[name='criteria']").click(function(){
		var checkedStatus;
		$("input[name='criteria']").not(this).prop('checked', false);
		//
		if($(this).is(":checked")){
			checkedStatus = $(this).val();
			console.log(checkedStatus)
		}
	})
	
	var lockerStatus = $("#cur-locker-reserve-status")
	var reserveExists = $("#reserve-exists").val()
	var cancelTypeButton = $("#current-locker-status-form input[type=submit]")

	console.log(lockerStatus.val())

	if(reserveExists == "true"){
		$("#current-locker-info").show()
		$("#no-locker").hide()

	   if(lockerStatus.val() == "owned"){
			$("#current-locker-status-form").attr("action", "abandon-locker")
			cancelTypeButton.val("Abandon Locker")

			console.log($("#current-locker-status-form").attr("action"))
		}
		else if(lockerStatus.val() == "reserved"){
			$("#current-locker-status-form").attr("action", "cancel-reservation")
			cancelTypeButton.val("Cancel Reservation")
			console.log($("#current-locker-status-form").attr("action"))
		}
		else if(lockerStatus.val() == "abandoned"){
			$("#current-locker-status-form").attr("action", "cancel-abandonment")
			cancelTypeButton.val("Cancel Abandonment")
			console.log($("#current-locker-status-form").attr("action"))
		}
	}
	else{
		$("#current-locker-info").hide()
		$("#no-locker").show()
	}
	
	var termDates = $("#term-date-option")
	var llSection = $(".ll-section")

	$("input[name='status']").prop('checked', true);

	termDates.hide()
	$(".locker-options").hide();
	//$(".edit-locker").hide();

	//$(".add-new-locker").hide();

	$(".edit-locker-option").hide()
	$(".delete-locker-option").hide()
	$(".delete-locker-confirm-option").hide()

	$("#term-dates").click(function(){
		termDates.show();
		llSection.hide();
	})

	$("#ll-options").click(function(){
		termDates.hide();
		llSection.show();
	})


	/*$("#delete-location").click(function(){
		for(let i = 0; i < locations.length; i++){
			if(locationSelect.val() == locations[i].locationName){
				locations.splice(i, 1)
			}
		}

		locationSelect.empty()

		for(let i = 0; i < locations.length; i++){
			var opLocation = $("<option></option>").text(locations[i].locationName)
			opLocation.val(locations[i].locationName);


			locationSelect.append(opLocation);
		}

		locationSelect.val(locations[0].locationName)
		initTable(locations[0].locationName)
	})*/

	$("#set-dates").click(function(){
		var termStart, termEnd;

		termStart = new Date($("input[name='termStart']").val())
		termEnd = new Date($("input[name='termEnd']").val())

		formattedStart = (termStart.getMonth()+1).toString() + "/" + termStart.getDate().toString() + "/" + termStart.getFullYear().toString() + " at " + termStart.getHours() + ":" + termStart.getMinutes()

		formattedEnd = (termEnd.getMonth()+1).toString() + "/" + termEnd.getDate().toString() + "/" + termEnd.getFullYear().toString() + " at " + termEnd.getHours() + ":" + termEnd.getMinutes()

		start = termStart;
		end = termEnd;

		term(start.toDateString(), end.toDateString())
		$('#dates-term').text(formattedStart + " - " + formattedEnd)
	})

	//$("#edit-options").hide()
	/*$("#start-edit").click(function(){
		$("#edit-options").show()
	})*/


	/*$(".delete-locker-button").on("click", function(){
		$(".delete-locker-option").show()

		$("input[name='lockerName']").on("click", function(){
			var checked = $(this)

			if(checked.is(":checked")){
				var checkedLockers = checked.val();

				checked.parent().css({
					"background-color": "yellow",
					"color": "dimgray"
				})

				$("#delete-form #confirm-delete").on("click", function(){
					for(let i = 0; i < lockers.length; i++){
						if(checkedLockers == lockers[i].lockerNo){
							lockers.splice(i, 1)
							initTable(locationSelect.val())
						}
					}
				})

				$("#delete-form #deselect-all-delete").on("click", function(){
					$("input[name='lockerName']").prop("checked", false)

					for(let i = 0; i < lockers.length; i++){
						if(lockers[i].location == locationSelect.val()){
							if(lockers[i].lockerNo == checked.val()){
								if(lockers[i].owned == true){
									checked.parent().css({
										"background-color": "darkred",
										"color": "azure"
									})

								}
								else if(lockers[i].reserved == true){
									checked.parent().css({
										"background-color": "dodgerblue",
										"color": "azure"
									})
								}
								else if(lockers[i].reserved == false && 
									   lockers[i].owned == false){
									checked.parent().css({
										"background-color": "green",
										"color": "azure"
									})
								}
							}
						}
					}
				})

			}
			else if(checked.not(":checked")){
				for(let i = 0; i < lockers.length; i++){
					if(lockers[i].location == locationSelect.val()){
						if(lockers[i].lockerNo == checked.val()){
							if(lockers[i].owned == true){
								checked.parent().css({
									"background-color": "darkred",
									"color": "azure"
								})

							}
							else if(lockers[i].reserved == true){
								checked.parent().css({
									"background-color": "dodgerblue",
									"color": "azure"
								})
							}
							else if(lockers[i].reserved == false && 
								   lockers[i].owned == false){
								checked.parent().css({
									"background-color": "green",
									"color": "azure"
								})
							}
						}
					}
				}
			}
		})

	})*/
	
	$(".reserve-locker-section").show()
	$(".owned-locker-section").hide()


	$("#reserve-select").click(function(){
		$("#reserve-select").attr("class", "nav-link active")
		$("#own-select").attr("class", "nav-link")

		$(".reserve-locker-section").show()
		$(".owned-locker-section").hide()
	})

	$("#own-select").click(function(){
		$("#reserve-select").attr("class", "nav-link")
		$("#own-select").attr("class", "nav-link active")

		$(".reserve-locker-section").hide()
		$(".owned-locker-section").show()
	})
	
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

			if(item.status == "reserved"){
				rCtr++;
			}
			else if(item.status == "owned"){
				oCtr++;
			}
			else if(item.status == "abandoned"){
				aCtr++;
			}
			
			if(item.Locker.lockerNo == $("#search-locker-no").text()){
			   if(item.Locker.location == $("#search-location").text()){
			   		$('#search-status td').text(item.status)
				}
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

function editProfile(){
	$("#edit-profile-hidden").submit()
}
