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
			statusForm.attr("method", "post")
			statusFormButton.val("Cancel Reservation")
		}
		else if(profileLockerStatus.val() == 'owned'){
			statusForm.attr("action", "abandon-locker")
			statusForm.attr("method", "post")
			statusFormButton.val("Abandon")
		}
		else if(profileLockerStatus.val() == 'abandoned'){
			statusForm.attr("action", "cancel-abandonment")
			statusForm.attr("method", "post")
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
		   	$("#current-locker-status-form").attr("method", "post")
			cancelTypeButton.val("Abandon Locker")

			console.log($("#current-locker-status-form").attr("action"))
		}
		else if(lockerStatus.val() == "reserved"){
			$("#current-locker-status-form").attr("action", "cancel-reservation")
			$("#current-locker-status-form").attr("method", "post")
			cancelTypeButton.val("Cancel Reservation")
			console.log($("#current-locker-status-form").attr("action"))
		}
		else if(lockerStatus.val() == "abandoned"){
			$("#current-locker-status-form").attr("action", "cancel-abandonment")
			$("#current-locker-status-form").attr("method", "post")
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

	$("form[action='delete-locker']").hide()

	$("#delete-locker-button").on("click", function(){
		$("form[action='delete-locker']").show()

		$("input[name='lockerName']").parent().attr("data-target", "")
		
		$("input[name='lockerName']").on("click", function(){
			var checked = $(this)

			if(checked.is(":checked")){
				var checkedLockers = checked.val();

				checked.parent().css({
					"border": "3px solid #233b53"
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
										"border": "none",
										"background-color": "darkred",
										"color": "azure"
									})

								}
								else if(lockers[i].reserved == true){
									checked.parent().css({
										"border": "none",
										"background-color": "dodgerblue",
										"color": "azure"
									})
								}
								else if(lockers[i].reserved == false && 
									   lockers[i].owned == false){
									checked.parent().css({
										"border": "none",
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
									"border": "none",
									"background-color": "darkred",
									"color": "azure"
								})

							}
							else if(lockers[i].reserved == true){
								checked.parent().css({
									"border": "none",
									"background-color": "dodgerblue",
									"color": "azure"
								})
							}
							else if(lockers[i].reserved == false && 
								   lockers[i].owned == false){
								checked.parent().css({
									"border": "none",
									"background-color": "green",
									"color": "azure"
								})
							}
						}
					}
				}
			}
		})

	})
	
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
	
	var dateStrings = []
	var lockersOccupied = []
	var locations = [];
	var lockersTable = $("#lockers-table")
	var manageLockersTable = $("#manage-lockers-table")
	
	var locationSelect = $("#location-select");
	var reserveLocationSelect = $(".locker-reserve-manager #reserve-location-select");
	var ownedLocationSelect = $(".locker-own-manager #reserve-location-select");
	var abandonLocationSelect = $(".locker-abandon-manager #reserve-location-select");
	
	$.get('get-term-dates', function(data, status){
		data.forEach(function(item, index){
			var t1, t2;
			t1 = JSON.stringify(item.start)
			t2 = JSON.stringify(item.end)

			var start, end;
			start = t1.split("T")[0].substring(1);
			end = t2.split("T")[0].substring(1);

			console.log(start)
			console.log(end)

			dateStrings.push(start)
			dateStrings.push(end)
			
			$("#date-range").text(dateStrings[0] + " to " + dateStrings[1])
		})
		
	})
	
	$.get('get-locations', function(data, status){
		data.forEach(function(item, index){
			var locationOption = $("<option></option>")
			var rLocationRequestOption = $("<option></option>")
			var oLocationRequestOption = $("<option></option>")
			var aLocationRequestOption = $("<option></option>")
			
			var location = {
				locationName: item.locationName,
				_id:  item._id,
				nAvailableLockers: 0,
				nTotalLockers: 0
			}
			
			locations.push(location)
			
			locationOption.attr("name", "currentSelectedLocation")
			locationOption.attr("value", location._id)
			locationOption.text(location.locationName)
			locationSelect.append(locationOption)
			
			rLocationRequestOption.attr("name", "currentSelectedLocation")
			rLocationRequestOption.attr("value", location._id)
			rLocationRequestOption.text(location.locationName)
			reserveLocationSelect.append(rLocationRequestOption)
			
			oLocationRequestOption.attr("name", "currentSelectedLocation")
			oLocationRequestOption.attr("value", location._id)
			oLocationRequestOption.text(location.locationName)
			ownedLocationSelect.append(oLocationRequestOption)
			
			aLocationRequestOption.attr("name", "currentSelectedLocation")
			aLocationRequestOption.attr("value", location._id)
			aLocationRequestOption.text(location.locationName)
			abandonLocationSelect.append(aLocationRequestOption)
		})
		
	})
	
	$.get('get-lockers', function(data, status){
		var lockerReserves = []

		locationSelect.val($("#location-select").val())
		$("input[name=selectedManageLocation]").val(locationSelect.val())
		
		for(var i = 0; i < locations.length; i++){
			if(locationSelect.val() == locations[i]._id){
				$("#add-locker-manage-location").text("Location: " + locations[i].locationName);
			}
		}

		var currLocation = locationSelect.val();
		var currLocationId;

		$("#location-name-selected").attr("value", currLocation)
		$("#location-name-selected").text(currLocation)

		$("#cancel-reminder").hide();

		lockersTable.empty();

		var nLockersSelected = 0;
		
		for(let i = 0; i < locations.length; i++){
			if(currLocation == locations[i]._id){
				nLockersSelected++;
			}
		}

		var rowCtr = 0;
		var ctr = 0;

		var rows = []
		for(let row = 0; row <= (nLockersSelected/5); row++){
			var lockerTr = $("<div></div>");
			lockerTr.attr("class", "row")
			rows.push(lockerTr)
			lockersTable.append(rows[row]);
			manageLockersTable.append(rows[row]);
		}

		data.forEach(function(item, index){
			initTable(currLocation, item, lockerReserves, lockersTable, rows[rowCtr], ctr)
			
			if(item.status == "reserved" || item.status == "owned"
			  || item.status == "abandoned"){
				var lockerReserve = {
					_id: item._id,
					lockerNo: item.lockerNo,
					locationId: item.location,
					location: "",
					status: item.status,
					idNo: ""
				}
				
			   lockersOccupied.push(lockerReserve)
			}
			
			var temp1 = 0, temp2 = 0;
			for(var i = 0; i < locations.length; i++){
				if(locations[i]._id == item.location){
					locations[i].nTotalLockers++;
					if(item.status == "available"){
						locations[i].nAvailableLockers++;
					}
				}
			}

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

		for(var i = 0; i < locations.length; i++){
			var tr = $("<tr></tr>");
			var td1, td2, td3;
			
			td1 = $("<td></td>");
			td2 = $("<td></td>");
			td3 = $("<td></td>");
			
			td1.text(locations[i].locationName)
			td2.text(locations[i].nTotalLockers.toString())
			td3.text(locations[i].nAvailableLockers.toString())
			
			tr.append(td1)
			tr.append(td2)
			tr.append(td3)
			
			$("#location-select-section #location-list").append(tr)
			
		}
		
		locationSelect.change(function(){
			var currLocation = locationSelect.val();
			$("input[name=selectedManageLocation]").val(currLocation)
			console.log($("input[name=selectedManageLocation]").val())
			
			$("#cancel-reminder").hide();
			
			for(var i = 0; i < locations.length; i++){
				if(currLocation == locations[i]._id){
					$("#add-locker-manage-location").text("Location: " + locations[i].locationName);
				}
			}
			

			lockersTable.empty(); 

			for(let i = 0; i < locations.length; i++){
				if(currLocation == locations[i]._id){
					nLockersSelected++;
				} 
			}

			rowCtr = 0; 
			ctr = 0;

			rows = [] 
			for(let row = 0; row <= nLockersSelected/5; row++){ 
				var lockerTr = $("<tr></tr>");
				rows.push(lockerTr)
				lockersTable.append(rows[row]);
			}


			data.forEach(function(item, index){
				initTable(currLocation, item, lockerReserves, lockersTable, rows[rowCtr], ctr)

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
	
	$.get('get-requests', function(data, status){
		data.forEach(function(item, index){
			console.log(lockersOccupied)
			for(var i = 0; i < lockersOccupied.length; i++){
				if(lockersOccupied[i]._id == item.locker){
				   lockersOccupied[i].idNo = item.idNo;
				}
			}
			
			for (var i = 0; i < lockersOccupied.length; i++){
				if(lockersOccupied[i].idNo == $("#id-no").val()){
					if(item.locker == lockersOccupied[i]._id){
						$("#lockers-table td").attr("data-toggle", "popover")

						if(lockersOccupied[i].status == "reserved"){
						   $("#lockers-table td").attr("data-content", "Sorry, but you cannot reserve another locker. Cancel your current reservation first to reserve another locker.")
						}
						else{
						   $("#lockers-table td").attr("data-content", "Sorry, but you cannot reserve another locker. Request to abandon your current locker first and wait for the request to be accepted to reserve another locker.")
						}

						$("#lockers-table td").popover()
						$("#lockers-table td").click(function(){
							setTimeout(function(){
								$("#lockers-table td").popover('hide')
							}, 1500)
						})
					}
				}
			}
		})
		
		locationSelect.change(function(){
			for (var i = 0; i < lockersOccupied.length; i++){
				if(lockersOccupied[i].idNo == $("#id-no").val()){
					$("#lockers-table td").attr("data-toggle", "popover")

					if(lockersOccupied[i].status == "reserved"){
					   $("#lockers-table td").attr("data-content", "Sorry, but you cannot reserve another locker. Cancel your current reservation first to reserve another locker.")
					}
					else{
					   $("#lockers-table td").attr("data-content", "Sorry, but you cannot reserve another locker. Request to abandon your current locker first and wait for the request to be accepted to reserve another locker.")
					}

					$("#lockers-table td").popover()
					$("#lockers-table td").click(function(){
						setTimeout(function(){
							$("#lockers-table td").popover('hide')
						}, 1500)
					})
				}
			}
		})
		
		for(var i = 0; i < lockersOccupied.length; i++){
			for(var j = 0; j < locations.length; j++){
				if(lockersOccupied[i].locationId == locations[j]._id){
				   lockersOccupied[i].location = locations[j].locationName;
				}
			}
		}
		
		var ridHeader, rlockerNoHeader, rlocationHeader, rcheckHeader;
		var rCtr = 0, oCtr = 0, aCtr = 0;

		reserveLocationSelect.val("all");
		ownedLocationSelect.val("all");
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
		
		console.log(reserveLocationSelect.val())
		for(var i = 0; i < lockersOccupied.length; i++){
			initReserveAllTable(lockersOccupied[i], "reserved")
			if(lockersOccupied[i].status == "reserved"){
			   rCtr++;
			}
		}

		for(var i = 0; i < lockersOccupied.length; i++){
			initReserveAllTable(lockersOccupied[i], "owned")
			if(lockersOccupied[i].status == "owned"){
			   oCtr++;
			}
		}

		for(var i = 0; i < lockersOccupied.length; i++){
			initReserveAllTable(lockersOccupied[i], "abandoned")
			if(lockersOccupied[i].status == "abandoned"){
			   aCtr++;
			}
		}

		$("#reserve-label").text("Manage Reservations " + "(" + rCtr + ")")
		$("#own-label").text("View Owned Lockers " + "(" + oCtr + ")")
		$("#abandon-label").text("Manage Abandon Requests " + "(" + aCtr + ")")

		$("#reserve-select").click(function(){
			$("#reserve-select").attr("class", "nav-link active")
			$("#own-select").attr("class", "nav-link")

			$(".reserve-locker-section #lockers-reserve-table > tr").remove();
			$(".locker-own-manager #lockers-reserve-table > tr").remove();
			$(".locker-abandon-manager #lockers-reserve-table > tr").remove();

			$(".reserve-locker-section").show()
			$(".owned-locker-section").hide()
			
			if(reserveLocationSelect.val() == "all"){
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveAllTable(lockersOccupied[i], "reserved")
				}
			}
			else{
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveTable(reserveLocationSelect.val(), lockersOccupied[i], "reserved")
				}

			}

			if(ownedLocationSelect.val() == "all"){
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveAllTable(lockersOccupied[i], "owned")
				}
			}
			else{
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveTable(ownedLocationSelect.val(), lockersOccupied[i], "owned")
				}
			}

			if(abandonLocationSelect.val() == "all"){
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveAllTable(lockersOccupied[i], "abandoned")
				}
			}
			else{
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveTable(abandonLocationSelect.val(), lockersOccupied[i], "abandoned")
				}
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
			
			if(reserveLocationSelect.val() == "all"){
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveAllTable(lockersOccupied[i], "reserved")
				}
			}
			else{
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveTable(reserveLocationSelect.val(), lockersOccupied[i], "reserved")
				}

			}

			if(ownedLocationSelect.val() == "all"){
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveAllTable(lockersOccupied[i], "owned")
				}
			}
			else{
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveTable(ownedLocationSelect.val(), lockersOccupied[i], "owned")
				}
			}

			if(abandonLocationSelect.val() == "all"){
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveAllTable(lockersOccupied[i], "abandoned")
				}
			}
			else{
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveTable(abandonLocationSelect.val(), lockersOccupied[i], "abandoned")
				}
			}

			$("#reserve-label").text("Manage Reservations " + "(" + rCtr + ")")
			$("#own-label").text("View Owned Lockers " + "(" + oCtr + ")")
			$("#abandon-label").text("Manage Abandon Requests " + "(" + aCtr + ")")
		})

		
		reserveLocationSelect.change(function(){
			var selectedLocation = $(this).val();

			$(".locker-reserve-manager #lockers-reserve-table > tr").remove();
			
			rCtr = 0; 
			
			if(selectedLocation == "all"){
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveAllTable(lockersOccupied[i], "reserved")
					if(lockersOccupied[i].status == "reserved"){
					   rCtr++;
					}
				}
			}
			else{
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveTable(selectedLocation, lockersOccupied[i], "reserved")
					if(selectedLocation == lockersOccupied[i].locationId && lockersOccupied[i].status == "reserved"){
					   rCtr++;
					}
				}
			}
			
			$("#reserve-label").text("Manage Reservations " + "(" + rCtr + ")")
			$("#own-label").text("View Owned Lockers " + "(" + oCtr + ")")
			$("#abandon-label").text("Manage Abandon Requests " + "(" + aCtr + ")")
			
		})
		
		ownedLocationSelect.change(function(){
			var selectedLocation = $(this).val();
		
			$(".locker-own-manager #lockers-reserve-table > tr").remove();
			 
			oCtr = 0;
			
			if(ownedLocationSelect.val() == "all"){
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveAllTable(lockersOccupied[i], "owned")
					if(lockersOccupied[i].status == "owned"){
					   oCtr++;
					}
				}
			}
			else{
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveTable(selectedLocation, lockersOccupied[i], "owned")
					if(selectedLocation == lockersOccupied[i].locationId && lockersOccupied[i].status == "owned"){
					   oCtr++;
					}
				}
			}
			
			$("#reserve-label").text("Manage Reservations " + "(" + rCtr + ")")
			$("#own-label").text("View Owned Lockers " + "(" + oCtr + ")")
			$("#abandon-label").text("Manage Abandon Requests " + "(" + aCtr + ")")
			
		})
		
		abandonLocationSelect.change(function(){
			var selectedLocation = $(this).val();

			$(".locker-abandon-manager #lockers-reserve-table > tr").remove();
			
			aCtr = 0;
									 
			if(abandonLocationSelect.val() == "all"){
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveAllTable(lockersOccupied[i], "abandoned")
					if(lockersOccupied[i].status == "abandoned"){
					   aCtr++;
					}
				}
			}
			else{
				for(var i = 0; i < lockersOccupied.length; i++){
					initReserveTable(selectedLocation, lockersOccupied[i], "abandoned")
					if(selectedLocation == lockersOccupied[i].locationId && lockersOccupied[i].status == "abandoned"){
					   aCtr++;
					}
				}
			}
			
			$("#reserve-label").text("Manage Reservations " + "(" + rCtr + ")")
			$("#own-label").text("View Owned Lockers " + "(" + oCtr + ")")
			$("#abandon-label").text("Manage Abandon Requests " + "(" + aCtr + ")")
		})
		
		for(var i = 0; i < lockersOccupied.length; i++){
			for(var j = 0; j < locations.length; j++){
				if(lockersOccupied[i].locationId == locations[j]._id){
				   lockersOccupied[i].location = locations[j].locationName;
				}
			}
		}
		
		
		
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

			button.click(function(){
				$("#location-name-selected").attr("value", locker.location);
				$("#edit-location-name-selected").attr("value", locker.location);
				$("#locker-selected").attr("value", locker.lockerNo);
				$("#location-name-lockers-selected").attr("value", locker.lockerNo);
				$("#edit-locker-no-selected").attr("value", locker.lockerNo);
				
				$("#locker-code-current").text(locker.lockCode)
				
				for(var i = 0; i < locations.length; i++){
					if(locker.location == locations[i]._id){
						$("#current-edit-location-manage").text("Location: " + locations[i].locationName)
					}
				}
				
			})
			
			if(locker.status == "reserved"){
				lockerTd.css({
					"height": "130px",
					"width": "130px",
					"display": "inline-block",
					"background-color": "dodgerblue",
					"color": "azure",
					"font-size": "38px",
					"padding-top": "40px"
				})
				lockerTd.attr("value", "reserved")
				lockerTd.attr("data-toggle", "popover")

				if($("#id-no").val() == "admin"){
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
			else if(locker.status == "owned" || locker.status == "abandoned"){
				lockerTd.css({
					"height": "130px",
					"width": "130px",
					"display": "inline-block",
					"background-color": "darkred",
					"color": "azure",
					"font-size": "38px",
					"padding-top": "40px"
				})
				lockerTd.attr("value", "owned")
				lockerTd.attr("data-toggle", "popover")

				if($("#id-no").val() == "admin"){
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
			else{
				lockerTd.css({
					"height": "130px",
					"width": "130px",
					"display": "inline-block",
					"background-color": "green",
					"color": "azure",
					"font-size": "38px",
					"padding-top": "40px"
					})
				lockerTd.attr("data-toggle", "modal")
				lockerTd.attr("value", "available")
				
				if(lockersTable.attr("class") == "manage-table"){
					console.log(lockersTable.val())
					lockerTd.attr("data-target", "#manage-edit-selected-locker")
				}
				else{
					lockerTd.attr("data-target", "#validity-confirm")
				}
			}
			
			lockerTd.append(button)
			row.append(lockerTd)
			
			ctr++;
		}
		
	}
	
	function initReserveTable(currLocation, lockerOccupied, marker){
		var row;
		var idNoTd, lockerNoTd, lockerLocTd, check;
		var checkForm, checkbox;
		
		
		if(currLocation == lockerOccupied.locationId){
			row = $("<tr></tr>");

			var cLabel = $("<label></label>");
			cLabel.attr("class", "c-label")

			var cSpan = $("<span></span>");
			cSpan.attr("class", "c-span")

			checkbox = $("<input>");
			checkbox.attr("type", "checkbox")
			checkbox.attr("name", "reserveCheck");
			checkbox.attr("value", lockerOccupied._id);

			idNoTd = $("<td></td>").text(lockerOccupied.idNo);
			lockerNoTd = $("<td></td>").text(lockerOccupied.lockerNo);
			lockerLocTd = $("<td></td>").text(lockerOccupied.location);
			check = $("<td></td>");

			cLabel.append(checkbox)
			cLabel.append(cSpan)

			row.attr("id", lockerOccupied.idNo);
			
			if(lockerOccupied.status != "owned"){
				row.append(cLabel)
			}
			
			//row.append(cLabel)
			row.append(idNoTd)
			row.append(lockerNoTd)
			row.append(lockerLocTd)

			if(lockerOccupied.status == "reserved" && marker == "reserved"){
				checkbox.attr("name", "reserveCheck");
				$(".locker-reserve-manager #lockers-reserve-table").append(row)
			}
			else if(lockerOccupied.status == "owned" && marker == "owned"){
				checkbox.attr("name", "reserveCheck");
				$(".locker-own-manager #lockers-reserve-table").append(row)
			}
			else if(lockerOccupied.status == "abandoned" && marker == "abandoned"){
				checkbox.attr("name", "abandonCheck");
				$(".locker-abandon-manager #lockers-reserve-table").append(row)
			}
			
		}
	}
	
	function initReserveAllTable(lockerOccupied, marker){
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
		checkbox.attr("value", lockerOccupied._id);

		idNoTd = $("<td></td>").text(lockerOccupied.idNo);
		lockerNoTd = $("<td></td>").text(lockerOccupied.lockerNo);
		lockerLocTd = $("<td></td>").text(lockerOccupied.location);
		check = $("<td></td>");

		cLabel.append(checkbox)
		cLabel.append(cSpan)

		row.attr("id", lockerOccupied.idNo);

		if(lockerOccupied.status != "owned"){
			row.append(cLabel)
		}

		//row.append(cLabel)
		row.append(idNoTd)
		row.append(lockerNoTd)
		row.append(lockerLocTd)

		if(lockerOccupied.status == "reserved" && marker == "reserved"){
			checkbox.attr("name", "reserveCheck");
			$(".locker-reserve-manager #lockers-reserve-table").append(row)
		}
		else if(lockerOccupied.status == "owned" && marker == "owned"){
			checkbox.attr("name", "reserveCheck");
			$(".locker-own-manager #lockers-reserve-table").append(row)
		}
		else if(lockerOccupied.status == "abandoned" && marker == "abandoned"){
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
