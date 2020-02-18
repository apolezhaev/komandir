using Microsoft.EntityFrameworkCore.Migrations;

namespace Komandir.Migrations
{
    public partial class Create : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContentTypeAttributeEditors",
                columns: table => new
                {
                    ContentTypeAttributeEditorID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: false),
                    Component = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentTypeAttributeEditors", x => x.ContentTypeAttributeEditorID);
                });

            migrationBuilder.CreateTable(
                name: "ContentTypes",
                columns: table => new
                {
                    ContentTypeID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentTypes", x => x.ContentTypeID);
                });

            migrationBuilder.CreateTable(
                name: "DataTypes",
                columns: table => new
                {
                    DataTypeID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataTypes", x => x.DataTypeID);
                });

            migrationBuilder.CreateTable(
                name: "ContentTypeAttributes",
                columns: table => new
                {
                    ContentTypeAttributeID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: false),
                    DataTypeID = table.Column<int>(nullable: false),
                    ContentTypeID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentTypeAttributes", x => x.ContentTypeAttributeID);
                    table.ForeignKey(
                        name: "FK_ContentTypeAttributes_ContentTypes_ContentTypeID",
                        column: x => x.ContentTypeID,
                        principalTable: "ContentTypes",
                        principalColumn: "ContentTypeID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContentTypeAttributes_DataTypes_DataTypeID",
                        column: x => x.DataTypeID,
                        principalTable: "DataTypes",
                        principalColumn: "DataTypeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContentTypeAttributes_ContentTypeID",
                table: "ContentTypeAttributes",
                column: "ContentTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_ContentTypeAttributes_DataTypeID",
                table: "ContentTypeAttributes",
                column: "DataTypeID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContentTypeAttributeEditors");

            migrationBuilder.DropTable(
                name: "ContentTypeAttributes");

            migrationBuilder.DropTable(
                name: "ContentTypes");

            migrationBuilder.DropTable(
                name: "DataTypes");
        }
    }
}
