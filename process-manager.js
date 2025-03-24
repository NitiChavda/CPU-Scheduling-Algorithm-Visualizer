var processes = [{
    id: 1,
    burst_time: 5,
    arrival_time: 0,
    priority: 1
}
];
let headers = ['Process Id', 'Burst Time', 'Arrival Time', 'Priority'];
function createTable() {
let table = $("#table");
let head = "";
for (h in headers) {
    head += "<th>" + headers[h] + "</th>";
}
table.append(`<thead><tr>${head}</tr></thead>`);
data = "";
for (p in processes) {
    let row = "";
    for (obj in processes[p]) {
        row += "<td>" + processes[p][obj] + "</td>";
    }
    data += "<tr>" + row + "</tr>";
}
table.append(`<tbody>${data}</tbody>`);
}
function displayTable() {
$("#table").empty();
createTable();
}
function orderProcess() {
let i = 0;
processes.forEach(function (p) {
    p.id = i + 1;
    i++;
});
}
function openAddModal() {
    // Reset modal input fields
    $('#modal_process_id').val(processes.length + 1);
    $('#modal_burst_time').val('');
    $('#modal_arrival_time').val('');
    $('#modal_priority').val('');

    // Show the add process modal
    $("#modal_add").modal("show");
}

function addProcess() {
    let input_burst = Number($('#modal_burst_time').val());
    let input_arrival = Number($('#modal_arrival_time').val());
    let input_priority = Number($('#modal_priority').val());

    // Validate input values
    if (input_burst > 0 && input_arrival >= 0 && input_priority >= 0) {
        let newProcess = {
            id: processes.length + 1,
            burst_time: input_burst,
            arrival_time: input_arrival,
            priority: input_priority
        };
        processes.push(newProcess);
        displayTable();
        $("#modal_add").modal("hide");
    } else {
        // Show error message or handle invalid input
        alert('Please enter valid values for Burst Time, Arrival Time, and Priority.');
    }
}

function addProcess() {
// let table = document.getElementById('table');
if ($("#modal_burst_time").val() < 1) {
    $("#error_bt").removeAttr("hidden");
} else {
    $("#error_bt").attr("hidden", true);
}
if ($("#modal_arrival_time").val() < 0) {
    $("#error_at").removeAttr("hidden");
} else {
    $("#error_at").attr("hidden", true);
}
if ($("#modal_priority").val() < 0) {
    $("#error_pt").removeAttr("hidden");
} else {
    $("#error_pt").attr("hidden", true);
}
if ($("#modal_burst_time").val() > 0 && $("#modal_arrival_time").val() >= 0 && $("#modal_priority").val() >= 0) {
    let input_burst = Number($('#modal_burst_time').val());
    let input_arrival = Math.max($('#modal_arrival_time').val(), 0);
    let input_priority = Math.max($('#modal_priority').val(), 0);
    obj = {
        id: processes.length + 1,
        burst_time: Number(input_burst),
        arrival_time: Number(input_arrival),
        priority: Number(input_priority)
    };
    processes.push(obj);
    displayTable();
    $("#modal_add").modal("toggle");
}
}
function openEditModal() {
let $dropdown_edit = $('#modal_edit_select');
$dropdown_edit.empty();
for (i = 0; i < processes.length; i++) {
    $dropdown_edit.append($("<option />").val(processes[i].id).text("Process " + processes[i].id));
    // $dropdown.append(new Option("Process "+processes[i].id, processes[i].id))
}
if (processes.length != 0) {
    $("#modal_edit_select").attr("disabled", false);
    $("#modal_edit_burst_time").attr("disabled", false);
    $("#modal_edit_arrival_time").attr("disabled", false);
    $("#modal_edit_priority").attr("disabled", false);
    $("#modal_edit_burst_time").attr("value", processes[0].burst_time);
    $("#modal_edit_arrival_time").attr("value", processes[0].arrival_time);
    $("#modal_edit_priority").attr("value", processes[0].priority);
    $('#modal_edit_burst_time').val(processes[0].burst_time);
    $('#modal_edit_arrival_time').val(processes[0].arrival_time);
    $('#modal_edit_priority').val(processes[0].priority);
} else {
    $("#modal_edit_select").attr("disabled", true);
    $("#modal_edit_burst_time").attr("disabled", true);
    $("#modal_edit_arrival_time").attr("disabled", true);
    $("#modal_edit_priority").attr("disabled", true);
}
$dropdown_edit.on('change', function () {
    let process_edit_selected = $("#modal_edit_select").val();
    $("#modal_edit_burst_time").attr("value", processes[process_edit_selected - 1].burst_time);
    $("#modal_edit_arrival_time").attr("value", processes[process_edit_selected - 1].arrival_time);
    $("#modal_edit_priority").attr("value", processes[process_edit_selected - 1].priority);

    $('#modal_edit_burst_time').val(processes[process_edit_selected - 1].burst_time);
    $('#modal_edit_arrival_time').val(processes[process_edit_selected - 1].arrival_time);
    $('#modal_edit_priority').val(processes[process_edit_selected - 1].priority);
});
}
function editProcess() {
if (processes.length != 0) {
    if ($("#modal_edit_burst_time").val() < 1) {
        $("#error_edit_bt").removeAttr("hidden");
    } else {
        $("#error_edit_bt").attr("hidden", true);
    }
    if ($("#modal_edit_arrival_time").val() < 0) {
        $("#error_edit_at").removeAttr("hidden");
    } else {
        $("#error_edit_at").attr("hidden", true);
    }
    if ($("#modal_edit_priority").val() < 0) {
        $("#error_edit_pt").removeAttr("hidden");
    } else {
        $("#error_edit_pt").attr("hidden", true);
    }
    if ($("#modal_edit_burst_time").val() > 0 && $("#modal_edit_arrival_time").val() >= 0 && $("#modal_edit_priority").val() >= 0) {
        let process_id = Number($("#modal_edit_select").val());
        let new_burst_time = Number($("#modal_edit_burst_time").val());
        let new_arrival_time = Number($("#modal_edit_arrival_time").val());
        let new_priority = Number($("#modal_edit_priority").val());
        if (new_burst_time === "") {
            new_burst_time = processes[process_id - 1].burst_time;
        }
        if (new_arrival_time === "") {
            new_arrival_time = processes[process_id - 1].arrival_time;
        }
        if (new_priority === "") {
            new_priority = processes[process_id - 1].priority;
        }
        processes[process_id - 1].burst_time = Number(new_burst_time);
        processes[process_id - 1].arrival_time = Number(new_arrival_time);
        processes[process_id - 1].priority = Number(new_priority);
        $("#modal_edit").modal("toggle");
    }
} else {
    $("#modal_edit").modal("toggle");
}
displayTable();
}
function openRemoveModal() {
let $dropdown_remove = $('#modal_remove_select');
$dropdown_remove.empty();
for (i = 0; i < processes.length; i++) {
    $dropdown_remove.append($("<option />").val(processes[i].id).text("Process " + processes[i].id));

}
}
function removeProcess() {
let removing_array = $('#modal_remove_select').val();
let i = 0;
for (i = 0; i < removing_array.length; i++) {
    let j = 0;
    processes.forEach(function (p) {
        if (removing_array[i] == p.id) {
            processes.splice(j, 1);
        }
        j++;
    });
}
orderProcess();
displayTable();
}
function start() {
init();
$("#gantt").removeAttr("hidden");
$("#result").removeAttr("hidden");
$('[data-toggle="tooltip"]').tooltip();
let checked = [false, false, false, false, false, false, false, false, false]
if ($("#fcfs_switch").prop('checked') === true) {
    FCFS(false);
    checked[0] = true;
}
if ($("#sjf_switch").prop('checked') === true) {
    SJFNonPre(false);
    checked[1] = true;
}

if ($("#priority_switch").prop('checked') === true) {
    priorityNonPre(false);
    checked[5] = true;
}

if ($("#roundrobin_switch").prop('checked') === true) {
    roundRobin(false);
    checked[7] = true;
}
displayGanttChart();
displayResultTable();
$('html, body').animate({
    scrollTop: $("#result_div").offset().top
}, 0);
}
function openGantt(id) {
if ($(id).attr("hidden"))
    $(id).removeAttr("hidden");
else
    $(id).attr("hidden", true);
}
$("#roundrobin_switch").on('change', () => {
if ($("#roundrobin_switch").prop('checked') === false) {
    $('#show_time_quanta').hide();
}
if ($("#roundrobin_switch").prop('checked') === true) {
    $('#show_time_quanta').show();
}
})
$("#vis_stop").on('click', () => {
stop_flag = true;
})
