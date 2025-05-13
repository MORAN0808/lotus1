// cloudfunctions/create-trip/index.js
const db = uniCloud.database();
const collection = db.collection('trips');

exports.main = async (event, context) => {
  // 验证用户登录状态
  const { uid } = await uniID.checkToken(event.uniIdToken);
  if (!uid) return { code: 401, msg: '未授权' };

  // 数据校验
  if (!event.name || !event.city || !event.startDate || !event.endDate) {
    return { code: 400, msg: '缺少必要参数' };
  }

  // 计算天数
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const daysCount = Math.ceil((end - start) / (86400000)) + 1;

  // 构造行程数据
  const tripData = {
    user_id: uid,
    name: event.name,
    city: event.city,
    start_date: event.startDate,
    end_date: event.endDate,
    status: 'pending',
    days: Array.from({ length: daysCount }, (_, i) => ({
      day: i + 1,
      attractions: []
    })),
    create_time: Date.now()
  };

  // 插入数据库
  const res = await collection.add(tripData);
  
  return {
    code: 200,
    data: {
      tripId: res.id
    }
  };
};