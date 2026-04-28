// This name MUST match the "name" in your config.json exactly
geotab.addin.QuickRepairAddin = function (api, state) {

    return {
        // This runs when the page is first loaded
        initialize: function (api, state, callback) {
            console.log("Add-in Initialized");
            // You MUST call callback() or the page stays blank/loading forever
            callback();
        },

        // This runs every time the user clicks your button/menu item
        focus: function (api, state) {
            // Your logic goes here
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
                    // Instead of a full reload, usually we just refresh the state
                    location.reload(); 
                });
            });
        },

        // This runs when the user navigates away
        blur: function (api, state) {
            console.log("User left the Add-in");
        }
    };
};
