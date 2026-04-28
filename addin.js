geotab.addin.workOrderClick = (api, state) => {
    // Get the ID of the inspection currently on your screen
    let inspectionId = state.getState().id;
    let deviceId = state.getState().device.id;

    if (!inspectionId) {
        alert("Please select an inspection first.");
        return;
    }

    // 1. Create the Work Order
    api.call("Add", {
        typeName: "MaintenanceRecord",
        entity: {
            device: { id: deviceId },
            status: "Completed",
            notes: "Closed via Quick-Action Button"
        }
    }, function() {
        // 2. Clear the Red Defect icon by marking it Repaired
        api.call("Set", {
            typeName: "DVIRLog",
            entity: {
                id: inspectionId,
                repairStatus: "Repaired",
                repairDate: new Date().toISOString()
            }
        }, function() {
            alert("Work Order Created & Red Icon Cleared!");
            location.reload(); 
        });
    });
};