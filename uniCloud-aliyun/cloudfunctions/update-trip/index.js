// cloudfunctions/update-trip/index.js
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { uid } = await uniID.checkToken(event.uniIdToken);
  if (!uid) return { code: 401, msg: '未授权' };

  const { tripId, days } = event;
  if (!tripId || !days) return { code: 400, msg: '参数错误' };

  const collection = db.collection('trips');
  
  // 验证行程归属
  const trip = await collection.doc(tripId).get();
  if (trip.data[0].user_id !== uid) {
    return { code: 403, msg: '无权操作' };
  }

  // 更新天数数据
  const res = await collection.doc(tripId).update({
    days: days
  });

  return {
    code: 200,
    msg: '更新成功'
  };
};