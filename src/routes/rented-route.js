import { Router } from "express";
import {
  store,
  index,
  show,
  update,
  destroy,
} from "../controllers/rented-controller.js";

import check_token from "../middleware/check_token.js";
import check_role from "../middleware/check_role.js";
import check_age from "../middleware/check_age.js";

const router = Router();

router.post("/", check_token, check_role(["ADM"]), check_age, store);
router.get("/", check_token, check_role(["ADM", "USU"]), index);
router.get("/:id", check_token, check_role(["ADM", "USU"]), show);
router.put("/:id", check_token, check_role(["ADM"]), check_age, update);
router.delete("/:id", check_token, check_role(["ADM"]), destroy);

export default router;