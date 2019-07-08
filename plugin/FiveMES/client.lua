Citizen.CreateThread(function()
	while true do
		Wait(1)
		playerPed = GetPlayerPed(-1)
		if playerPed then
			playerCar = GetVehiclePedIsIn(playerPed, false)
			if playerCar and GetPedInVehicleSeat(playerCar, -1) == playerPed then
				carRPM = GetVehicleCurrentRpm(playerCar)
				carSpeed = GetEntitySpeed(playerCar)
				carGear = GetVehicleCurrentGear(playerCar)
				carIL = GetVehicleIndicatorLights(playerCar)
				carHandbrake = GetVehicleHandbrake(playerCar)
				carLS_r, carLS_o, carLS_h = GetVehicleLightsState(playerCar)
				SendNUIMessage({
					incar = true,
					CurrentCarRPM = carRPM,
					CurrentCarGear = carGear,
					CurrentCarSpeed = carSpeed,
					CurrentCarIL = carIL,
					CurrentCarHandbrake = carHandbrake,
					CurrentCarLS_r = carLS_r,
					CurrentCarLS_o = carLS_o,
					CurrentCarLS_h = carLS_h,
					playerID = GetPlayerServerId(GetPlayerIndex())
				})
			else
				SendNUIMessage({outcar = true})
			end
		end
	end
end)