class CreateUserPostComment < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :user_name, unique: true
      t.string :email, unique: true, null: false
      t.datetime :email_verified
      t.string :bio
      t.string :password
      t.string :cover_img
      t.string :profile_img
      t.jsonb :following_ids, array: true, default: [], null: false

      t.datetime :deleted_at
      t.timestamps
    end

    create_table :posts do |t|
      t.string :content, null: false
      t.timestamps

      t.references :users, foreign_key: true
    end

    create_table :comments do |t|
      t.string :content, null: false

      t.datetime :deleted_at
      t.timestamps

      t.references :posts, foreign_key: true
      t.references :users, foreign_key: true
    end

    create_table :reactions do |t|
      t.integer :type_reaction, null: false

      t.references :posts, foreign_key: true
      t.references :comments, foreign_key: true
    end
  end
end
