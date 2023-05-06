# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_03_040837) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string "content", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "posts_id"
    t.bigint "users_id"
    t.index ["posts_id"], name: "index_comments_on_posts_id"
    t.index ["users_id"], name: "index_comments_on_users_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "users_id"
    t.index ["users_id"], name: "index_posts_on_users_id"
  end

  create_table "reactions", force: :cascade do |t|
    t.integer "type_reaction", null: false
    t.bigint "posts_id"
    t.bigint "comments_id"
    t.index ["comments_id"], name: "index_reactions_on_comments_id"
    t.index ["posts_id"], name: "index_reactions_on_posts_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "user_name"
    t.string "email", null: false
    t.datetime "email_verified"
    t.string "bio"
    t.string "password"
    t.string "cover_img"
    t.string "profile_img"
    t.jsonb "following_ids", default: [], null: false, array: true
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "comments", "posts", column: "posts_id"
  add_foreign_key "comments", "users", column: "users_id"
  add_foreign_key "posts", "users", column: "users_id"
  add_foreign_key "reactions", "comments", column: "comments_id"
  add_foreign_key "reactions", "posts", column: "posts_id"
end
