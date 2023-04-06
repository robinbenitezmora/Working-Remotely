require "test_helper"

module Api
  class PlacesControllerTest < ActionDispatch::IntegrationTest
    test "answers places the match search term is empty" do
      place = FactoryBot.create(:place)
      get "/api/places?search_term=#{place.name}"
      parsed_body = JSON.parse(response.body)
      expected_response = (
        {
          places: [
            {
              name: place.name,
              city: place.city,
              most_recent_download_speed: nil,
              most_recent_download_units: nil,
              amount_of_measurements: 0
            }
          ]
        }.stringify_keys
      )
      assert_equal expected_response, parsed_body
    end

    test "answers all places if search term is set" do
      place1 = FactoryBot.create(:place, name: "Starbucks")
      place2 = FactoryBot.create(:place, name: "McDonalds")
      get "/api/places?search_term=#{place.name}"
      parsed_body = JSON.parse(response.body)
      expected_response = (
        {
          places: [
            {
              name: place.name,
              city: place.city,
              most_recent_download_speed: nil,
              most_recent_download_units: nil,
              amount_of_measurements: 0
            }
          ]
        }.stringify_keys
      )
      assert_equal expected_response, parsed_body
    end

    test "answers no places if search term does not match any places" do
      FactoryBot.create(:place, name: "Starbucks")
      get "/api/places?search_term=McDonalds"
      parsed_body = JSON.parse(response.body)
      expected_response = { places: [] }.stringify_keys
      assert_equal expected_response, parsed_body
    end

    test "recent upload speed, units and amount of measurements are correct" do
      place = FactoryBot.create(:place, name: "Starbucks", city: "New York")
      speed1 = FactoryBot.create(
        :internet_speed,
        place: place,
        download_speed: 10,
        download_units: "Mbps",
        created_at: 1.day.ago
      )
      speed2 = FactoryBot.create(
        :internet_speed,
        place: place,
        download_speed: 20,
        download_units: "Mbps",
        created_at: 2.days.ago
      )
      get "/api/places?search_term"
      parsed_body = JSON.parse(response.body)
      expected_response = (
        {
          places: [
            {
              name: "Starbucks",
              city: "New York",
              most_recent_download_speed: 10,
              most_recent_download_units: "Mbps",
              amount_of_measurements: 2
            }
          ]
        }.stringify_keys
      )
      assert_equal expected_response, parsed_body
    end
  end
end
