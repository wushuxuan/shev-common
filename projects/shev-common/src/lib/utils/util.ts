import { SFSchema, SFUISchemaItem, SFSchemaEnum } from '@delon/form';
import { deepCopy, toBoolean } from '@delon/util';
import { of, Observable } from 'rxjs';
import { format, getHours, getMinutes, getSeconds } from 'date-fns';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

declare var config: any;

export type BooleanInput = boolean | string | undefined | null;
export type SafeAny = any;

export function getSeatList(array) {
  var seatList: any = []
  if (array && array.length > 0) {
    var maxColumn = Math.max.apply(Math, array.map(function (o) { return o.column }))
    for (let index = 0; index < maxColumn; index++) {
      var item = []
      array.forEach(element => {
        if (element.column == index + 1) {
          item.push({
            row: element.column,
            column: element.row,
            name: element.name,
            userId: element.userId,
            id: element.id
          })
        }
      });
      if (item && item.length > 0) {
        seatList.push(item)
      }
    }
  }
  return seatList;
}
export function getColumns(array) {
  var columns: any = []
  if (array && array.length > 0) {
    array.forEach((element: any) => {
      let splitList: any = []
      element.split('-').forEach(item => {
        splitList.push(parseInt(item))
      });
      columns.push(splitList)
    })
  }
  return columns;
}

export function generateMixed(n) {
  var chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 62);
    res += chars[id];
  }
  return res;
}

export function getMenuByJurisdiction(list, roleList) {
  var rolePackage: any = [];
  list.forEach(element => {
    var index: any = {
      classification: element.classification,
      group: element.group,
      icon: element.icon,
      link: element.link,
      text: element.text,
      i18n: element.i18n,
      children: []
    };
    if (element.children && element.children.length > 0) {
      element.children.forEach(item => {
        if (_.intersection(item.Jurisdiction, roleList) && _.intersection(item.Jurisdiction, roleList).length) {
          index.children.push(item)
        }
      });
      if (index.children && index.children.length > 0) {
        rolePackage.push(index)
      }
    } else {
      if (_.intersection(element.Jurisdiction, roleList) && _.intersection(element.Jurisdiction, roleList).length) {
        rolePackage.push(element)
      }
    }
  });
  return rolePackage;
}

export function getMenu(list, role) {
  var rolePackage: any = [];
  filterArray(list, null).forEach(element => {
    var index: any = {
      group: element.group,
      icon: element.icon,
      menuId: element.menuId,
      link: element.link,
      text: element.text,
      externalLink: element.externalLink,
      target: element.target,
      i18n: element.i18n,
      children: []
    };
    if (element.children && element.children.length > 0) {
      element.children.forEach(item => {
        if (item.Jurisdiction && item.Jurisdiction.indexOf(role) > -1) {
          index.children.push(item)
        }
      });
      if (index.children && index.children.length > 0) {
        rolePackage.push(index)
      }
    } else {
      if (element.Jurisdiction && element.Jurisdiction.indexOf(role) > -1) {
        rolePackage.push(element)
      }
    }
  });
  return rolePackage;
}


function filterArray(data, pid) {
  const tree = (id) => {
    let arr = []
    data.filter(item => {
      return item.parentMenuId === id;
    }).forEach(item => {
      item.children = tree(item.menuId)
      arr.push(item)
    })
    return arr
  }
  return tree(pid) // 第一级节点的父id，是null或者0，视情况传入
}

// getHours(format(new Date(), 'YYYY-MM-DD') + " 00:01:36.386")
export function getDateHour(time) {
  var newTime: any = format(new Date(), 'YYYY-MM-DD ') + time
  return getHours(newTime)
}

export function getDateMinutes(time) {
  var newTime: any = format(new Date(), 'YYYY-MM-DD ') + time
  return getMinutes(newTime)
}
export function getDateSeconds(time) {
  var newTime: any = format(new Date(), 'YYYY-MM-DD ') + time
  return getSeconds(newTime)
}

export function getDayStart(time) {
  return new Date(format(time, 'YYYY-MM-DD 00:00:00')).getTime()
}

export function getDayEnd(time) {
  return new Date(format(time, 'YYYY-MM-DD 23:59:59')).getTime()
}

export function supportingDataLabel(status, data) {
  var label: any = ""
  data.forEach(element => {
    if (element.code == status) {
      label = element.label;
    }
  });
  return label;
}


export function supportingDataSelectList(data) {
  var list: any = []
  data.forEach(element => {
    element.value = element.code
    list.push(element)
  });
  return list;
}

//判断角色
export function RoleOfAdmin(role) {
  var adminList: any = ['schoolAdmin', 'headmasterAdmin', 'teacherAdmin'];
  if (adminList.indexOf(role) > -1) {
    return true;
  } else {
    return false;
  }
}

export function RoleOfHeadmaster(role) {
  if (role == "headmaster") {
    return true;
  } else {
    return false;
  }
}
export function RoleOfTeacher(role) {
  if (role == "teacher" || role == "eleTeacher") {
    return true;
  } else {
    return false;
  }
}

export function roleOfClass(role, headmasterList, teacherCourseList) {
  var array: any = [];
  if (RoleOfAdmin(role)) {
    if (config.electivesList && config.electivesList.length > 0 && config.electivesList[0].children) {
      array = headmasterList.concat(config.electivesList[0].children);
    } else {
      array = headmasterList
    }
  } else if (RoleOfHeadmaster(role)) {
    var newTeacherCourseList: any = []
    teacherCourseList.forEach(element => {
      if (element.selectionType == "2") {
        newTeacherCourseList.push(element)
      }
    });
    array = uniqueArray(headmasterList.concat(newTeacherCourseList), 'groupId')
  } else if (RoleOfTeacher(role)) {
    var newTeacherCourseList: any = []
    teacherCourseList.forEach(element => {
      if (element.selectionType == "2") {
        newTeacherCourseList.push(element)
      }
    });
    array = newTeacherCourseList;
  }
  return array;
}

export function KeyOfArray(array, key) {
  var label: any;
  array.forEach(element => {
    if (element.code == key) {
      label = element.label;
    }
  });
  return label;
}

export function UserPhotoUrl(userId,domainName=config.domainName) {
  return "http://" + domainName + "/manager/account/avatar/show/" + userId + '?' + new Date().getTime();
}

export function LessonDetail(url, token) {
  return "http://" + config.domainName + "/oauth2/oauth/authorize?client_id=" + config.clientId + "&response_type=code&access_token=" + token + "&redirect_uri=" + url
}

export function QuoteLink(id, token) {
  return "http://" + config.domainName + "/edu/lessons/courseDetails?courseId=" + id
}

export function IntegrationRelationship(item, leaveRelationName, child) {
  var str = "";
  switch (item.leaveUserType) {
    case 'T':
      str = item.leaveUserName
      break;
    case 'P':
      if (item.childName && child) {
        str += item.childName + ' - '
      }
      if (item.leaveRelationName) {
        str += item.leaveRelationName + ' - '
      } else {
        str += leaveRelationName + ' - '
      }
      if (item.leaveUserName) {
        str += item.leaveUserName
      }
      break;
    case 'S':
      str = item.leaveUserName
      break;
  }
  if (str) {
    return str;
  } else {
    return ' - ';
  }
}
/**
 * json 转 file
 */
export function dataURLtoFile(dataurl, filename) {//将base64转换为文件
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
/**
 * json 转 formData
 */
export function jsonToFormData(obj): any {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key]);
  });

  return formData;
}
//拖动
export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};


export function isBlank(o: any) {
  return o == null;
}

export function getEnum(list: any[], formData: any, readOnly: boolean): SFSchemaEnum[] {
  if (isBlank(list) || !Array.isArray(list) || list.length === 0) return [];
  if (typeof list[0] !== 'object') {
    list = list.map((item: any) => {
      return { label: item, value: item } as SFSchemaEnum;
    });
  }
  if (formData) {
    if (!Array.isArray(formData)) formData = [formData];
    list.forEach((item: SFSchemaEnum) => {
      if (~formData.indexOf(item.value)) item.checked = true;
    });
  }
  // fix disabled status
  if (readOnly) {
    list.forEach((item: SFSchemaEnum) => (item.disabled = true));
  }
  return list;
}

export function getCopyEnum(list: any[], formData: any, readOnly: boolean) {
  return getEnum(deepCopy(list || []), formData, readOnly);
}


export function getData(schema: SFSchema, ui: SFUISchemaItem, formData: any, asyncArgs?: any): Observable<SFSchemaEnum[]> {
  if (typeof ui.asyncData === 'function') {
    return ui.asyncData(asyncArgs).pipe(map((list: SFSchemaEnum[]) => getEnum(list, formData, schema.readOnly!)));
  }
  return of(getCopyEnum(schema.enum!, formData, schema.readOnly!));
}



export function toBool(value: any, defaultValue: boolean) {
  value = toBoolean(value, true);
  return value == null ? defaultValue : value;
}



//去重
export function uniqueArray(array, key) {
  if (array && array.length) {
    var result = [array[0]];
  } else {
    var result = [];
  }
  for (var i = 1; i < array.length; i++) {
    var item = array[i];
    var repeat = false;
    for (var j = 0; j < result.length; j++) {
      if (item[key] == result[j][key]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      result.push(item);
    }
  }
  return result;
}

//计算俩个日期中所有的月份
export function getMonthBetween(start, end) {
  var result: any = [];
  var min = new Date();
  var max = new Date();
  min = new Date(start)
  max = new Date(end)
  var curr = min;
  while (curr <= max) {
    var month = curr.getMonth();
    // month = month == 0 ? 12 : month;
    var str: any = curr.getFullYear() + "-" + (month + 1) + "-1";
    var si: any = curr.getFullYear() + "-0" + "-1";
    if (str == si) {
      str = (curr.getFullYear() - 1) + "-12";
    }
    result.push(str);
    curr.setMonth(month + 1);
  }
  return result;
}

//当前月份的最后一天
export function getCurrentMonthLast(value) {
  var currentMonth = value.getMonth();
  var nextMonth = ++currentMonth;
  var nextMonthFirstDay: any = new Date(value.getFullYear(), nextMonth, 1);
  var oneDay = 1000 * 60 * 60 * 24;
  var lastTime: any = new Date(nextMonthFirstDay - oneDay);
  var month: any = parseInt(lastTime.getMonth() + 1);
  var day = lastTime.getDate();
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return new Date(value.getFullYear() + '-' + month + '-' + day);
}

export function Compare(propertyName) {
  return function (object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value2 < value1) {
      return -1;
    } else if (value2 > value1) {
      return 1;
    } else {
      return 0;
    }
  }
}


export function UpCompare(propertyName) {
  return function (object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value2 > value1) {
      return -1;
    } else if (value2 < value1) {
      return 1;
    } else {
      return 0;
    }
  }
}


export function monday(date) {
  var nowTime = new Date(date).getTime();
  // var day = new Date(date).getDay() || 7;//周一是每周的第一天
  var day = date.getDay() //周日是每周的第一天
  var oneDayTime = 24 * 60 * 60 * 1000;

  var Monday = nowTime - (day) * oneDayTime;
  var mondayTime = new Date(Monday);

  var year = mondayTime.getFullYear();
  var monMath = mondayTime.getMonth() + 1;
  var month = (monMath < 10) ? "0" + "" + monMath + "" : monMath;
  var data = (mondayTime.getDate() < 10) ? "0" + "" + mondayTime.getDate() + "" : mondayTime.getDate();
  var mondayDate = "" + year + "-" + month + "-" + data + ""
  return new Date(mondayDate).getTime();
}
