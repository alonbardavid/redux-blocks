import React from 'react';
import {formatToMonth,formatToHourMinute} from '../../../common/formatting';

function activityTime(activity){
    return `${formatToMonth(activity.startDate)} - ${formatToHourMinute(activity.startDate)} till ${formatToHourMinute(activity.endDate)}`
}

export default function ActivityList({activities=[]}) {
    return  <ul>
        {activities.map(activity=><li key={activity.id}>
            {activityTime(activity)} : {activity.task.name}
        </li>)}
    </ul>
}