module Api
  class PlacesControllerTest < ActiveSupport::TestCase
    test " answers places the match search term if set" do
      place = FactoryBot.create(:place)
      binding.break
      assert true
    end

    test "answers all places if search term is empty" do
      assert false
    end
  end
end
