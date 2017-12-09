
function getUserData(controller, userId, cb) {
  controller.storage.users.get(userId, (err, userData) => {
    if (err) { cb(err) }
    else { cb(null, userData.data) }
  });
}

function updateUserData(controller, userId, data, cb) {
  controller.storage.users.get(userId, (err, userData) => {
    if(err) { cb(err); }
    else {
      const newUserData = {
        id: userData.id,
        data: { ...(userData.data||{}), ...data }
      }
      controller.storage.users.save(newUserData, (err) => {
        if(err) { cb(err) }
      });
    }
  });
}

module.exports = {
  getUserData,
  updateUserData,
}
