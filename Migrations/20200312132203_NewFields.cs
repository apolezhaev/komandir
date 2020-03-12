using Microsoft.EntityFrameworkCore.Migrations;

namespace Komandir.Migrations
{
    public partial class NewFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Fields",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "Fields",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Regex",
                table: "Fields",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Required",
                table: "Fields",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "ContentTypes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Fields");

            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "Fields");

            migrationBuilder.DropColumn(
                name: "Regex",
                table: "Fields");

            migrationBuilder.DropColumn(
                name: "Required",
                table: "Fields");

            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "ContentTypes");
        }
    }
}
