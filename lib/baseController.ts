import { error } from "console";
import { NextResponse } from "next/server";

export class BaseController<TService> {
  protected service: TService;

  constructor(service: TService) {
    this.service = service;
  }

  protected handleError(error: any) {
    return (
      NextResponse.json({ error: error.message || "Server error" }),
      { status: 400 }
    );
  }
}

// kiến trúc tổ chức lưu trữ
