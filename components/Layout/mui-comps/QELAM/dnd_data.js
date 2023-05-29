const dnd_data = {
    tasks:{
        'task-1': {"id":"task-1", "content": "Do the mopping"},
        'task-2': {"id":"task-2", "content": "Do shopping"},
        'task-3': {"id":"task-3", "content": "Clean Room"},
        'task-4': {"id":"task-4", "content": "Clean pool"},
    },
    columns:{
        'column-1':{
            id:'column-1',
            name:"To do",
            taskIds:['task-1','task-2','task-3','task-4']
        },
        'column-2':{
            id:'column-2',
            name:"In Progress",
            taskIds:[]
        },
        'column-3':{
            id:'column-3',
            name:"Done",
            taskIds:[]
        }
    },
    columnOrder:['column-1','column-2','column-3'],
}

export default dnd_data