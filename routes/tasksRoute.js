const express=require("express");
const router=express.Router();
const taskController=require("../controller/tasksController");

router.route("/")
    .get(taskController.getTasks)
    .post(taskController.postTask)
router.route("/:id")
    .get(taskController.getTaskById)
    .put(taskController.updateTaskById)
    .delete(taskController.deleteTaskById)

module.exports=router;