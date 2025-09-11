-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firebaseUid` VARCHAR(191) NOT NULL,
    `hoTen` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `sdt` VARCHAR(191) NULL,
    `ngaySinh` DATETIME(3) NULL,
    `diaChi` VARCHAR(191) NULL,
    `vaiTro` ENUM('TinhNguyenVien', 'toChuc', 'admin') NOT NULL,
    `ngayTao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngayCapNhat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_firebaseUid_key`(`firebaseUid`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_sdt_key`(`sdt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
