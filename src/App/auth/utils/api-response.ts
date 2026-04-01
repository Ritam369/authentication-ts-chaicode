import type { Response } from "express";

class ApiResponse {
  static success(res: Response, message: string = "Success", data: any) {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  static created(res: Response, message = "Created", data: any) {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }
}

export default ApiResponse;
