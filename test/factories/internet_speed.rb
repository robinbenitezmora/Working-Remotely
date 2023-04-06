FactoryBot.define do
  factory :internet_speed do
    place { Facker::Place.name }
    download_speed { Faker::Number.decimal(l_digits: 2, r_digits: 2) }
    upload_units { Faker::Number.decimal(l_digits: 2) }
    ping { Faker::Number.decimal(l_digits: 2) }
  end
end
