const express=require("express");
const router=express.Router();
const taskController=require("../controller/tasksController");

router.route("/")
    .get(taskController.getTasks)
    .post(taskController.postTask)
    .put(taskController.updateTasks)
    .delete(taskController.deleteMany)

router.route("/leaderboard")
    .get(taskController.getLeaderBoard)

router.route("/user-stats")
    .get(taskController.getUserStats)
router.route("/:id")
    .get(taskController.getTaskById)
    .put(taskController.updateTaskById)
    .delete(taskController.deleteTaskById)

module.exports=router;