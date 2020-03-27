﻿// <auto-generated />
using Komandir.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Komandir.Migrations
{
    [DbContext(typeof(KomandirDbContext))]
    [Migration("20200327175327_ContentTable")]
    partial class ContentTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1");

            modelBuilder.Entity("Komandir.Models.Content", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ContentTypeID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Properties")
                        .HasColumnType("TEXT");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.HasIndex("ContentTypeID");

                    b.ToTable("Content");
                });

            modelBuilder.Entity("Komandir.Models.ContentType", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("DisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("ContentTypes");
                });

            modelBuilder.Entity("Komandir.Models.DataType", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("DataTypes");
                });

            modelBuilder.Entity("Komandir.Models.Field", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ContentTypeID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("DataTypeID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("DisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Regex")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Required")
                        .HasColumnType("INTEGER");

                    b.HasKey("ID");

                    b.HasIndex("ContentTypeID");

                    b.HasIndex("DataTypeID");

                    b.ToTable("Fields");
                });

            modelBuilder.Entity("Komandir.Models.FieldEditor", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Component")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("FieldEditors");
                });

            modelBuilder.Entity("Komandir.Models.Content", b =>
                {
                    b.HasOne("Komandir.Models.ContentType", "ContentType")
                        .WithMany()
                        .HasForeignKey("ContentTypeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Komandir.Models.Field", b =>
                {
                    b.HasOne("Komandir.Models.ContentType", "ContentType")
                        .WithMany("Fields")
                        .HasForeignKey("ContentTypeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Komandir.Models.DataType", "DataType")
                        .WithMany()
                        .HasForeignKey("DataTypeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
