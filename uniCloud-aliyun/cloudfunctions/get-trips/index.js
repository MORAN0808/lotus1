// cloudfunctions/get-trips/index.js
const db = uniCloud.database();
const collection = db.collection('trips');

exports.main = async (event, context) => {
  const { status } = event;
  const { uid } = uniCloud.getCurrentUserInfo();

  // 处理未登录状态
  if (!uid) {
    return { code: 401, message: "未登录" };
  }

  const now = Date.now();
  const where = { userId: uid };

  // 动态添加查询条件
  if (status === 'pending') {
    where.startDate = db.command.gt(now);
  } else if (status === 'finished') {
    where.endDate = db.command.lte(now);
  }

  // 查询数据库
  try {
    const res = await collection
      .where(where)
      .orderBy('startDate', 'asc')
      .get();

    return {
      code: 200, // 规范使用 200 表示成功
      data: res.data.map(item => ({
        ...item,
        startDate: new Date(item.startDate).toISOString().split('T')[0],
        endDate: new Date(item.endDate).toISOString().split('T')[0]
      }))
    };
  } catch (e) {
    console.error('数据库查询失败:', e);
    return { code: 500, message: "服务器内部错误" };
  }
};